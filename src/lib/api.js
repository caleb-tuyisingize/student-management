// api.js

import axios from 'axios';

import { supabase } from './supabase';

/**
 * Converts a string from camelCase to snake_case
 * @param {string} str - The camelCase string to convert
 * @return {string} The snake_case string
 */
const camelToSnake = str => {
  if (typeof str !== 'string') return str;
  return str.replace(/([A-Z])/g, letter => `_${letter.toLowerCase()}`);
};

/**
 * Converts a string from snake_case to camelCase
 * @param {string} str - The snake_case string to convert
 * @return {string} The camelCase string
 */
const snakeToCamel = str => {
  if (typeof str !== 'string') return str;
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 * Recursively transforms all keys in an object from snake_case to camelCase
 * @param {Object} obj - The object with snake_case keys
 * @return {Object} A new object with camelCase keys
 */
export const objectToCamelCase = obj => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => objectToCamelCase(item));
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = snakeToCamel(key);
    acc[camelKey] = objectToCamelCase(obj[key]);
    return acc;
  }, {});
};

/**
 * Recursively transforms all keys in an object from camelCase to snake_case
 * @param {Object} obj - The object with camelCase keys
 * @return {Object} A new object with snake_case keys
 */
const objectToSnakeCase = obj => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => objectToSnakeCase(item));
  }

  return Object.keys(obj).reduce((acc, key) => {
    const snakeKey = camelToSnake(key);
    acc[snakeKey] = objectToSnakeCase(obj[key]);
    return acc;
  }, {});
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const studentService = {
  getAllStudents: async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      // Transform snake_case to camelCase for frontend use
      const transformedData = data.map(student => objectToCamelCase(student));
      return {
        success: true,
        count: transformedData.length,
        data: transformedData,
      };
    } catch (error) {
      console.error('Error fetching students:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch students',
        data: [],
      };
    }
  },

  getStudentById: async id => {
    try {
      const { data, error } = await supabase.from('students').select('*').eq('id', id).single();
      if (error) throw error;
      // Transform snake_case to camelCase
      const transformedData = objectToCamelCase(data);
      return {
        success: true,
        data: transformedData,
      };
    } catch (error) {
      console.error(`Error fetching student with ID ${id}:`, error);
      return {
        success: false,
        message: error.message || `Failed to fetch student with ID ${id}`,
      };
    }
  },

  createStudent: async studentData => {
    try {
      // Transform camelCase to snake_case for database
      const snakeCaseData = objectToSnakeCase(studentData);
      console.log('Transformed data for database:', snakeCaseData);
      const { data, error } = await supabase.from('students').insert([snakeCaseData]).select();
      if (error) throw error;
      // Transform back to camelCase for frontend
      const transformedData = objectToCamelCase(data[0]);
      return {
        success: true,
        data: transformedData,
        message: 'Student created successfully',
      };
    } catch (error) {
      console.error('Error creating student:', error);
      return {
        success: false,
        message: error.message || 'Failed to create student',
      };
    }
  },

  updateStudent: async (id, studentData) => {
    try {
      // Transform camelCase to snake_case for database
      const snakeCaseData = objectToSnakeCase(studentData);
      const { data, error } = await supabase
        .from('students')
        .update(snakeCaseData)
        .eq('id', id)
        .select();
      if (error) throw error;
      // Transform back to camelCase for frontend
      const transformedData = objectToCamelCase(data[0]);
      return {
        success: true,
        data: transformedData,
        message: 'Student updated successfully',
      };
    } catch (error) {
      console.error(`Error updating student with ID ${id}:`, error);
      return {
        success: false,
        message: error.message || `Failed to update student with ID ${id}`,
      };
    }
  },
  deleteStudent: async id => {
    try {
      const { error } = await supabase.from('students').delete().eq('student_id', id);
      if (error) throw error;
      return {
        success: true,
        message: 'Student deleted successfully',
      };
    } catch (error) {
      console.error(`Error deleting student with ID ${id}:`, error);
      return {
        success: false,
        message: error.message || `Failed to delete student with ID ${id}`,
      };
    }
  },

  searchStudents: async query => {
    try {
      const { data, error } = await supabase.rpc('search_students', { search_query: query });
      if (error) throw error;
      // Transform snake_case to camelCase
      const transformedData = data.map(student => objectToCamelCase(student));
      return {
        success: true,
        count: transformedData.length,
        data: transformedData,
      };
    } catch (error) {
      console.error(`Error searching students with query "${query}":`, error);
      return {
        success: false,
        message: error.message || 'Failed to search students',
        data: [],
      };
    }
  },
};

// Add interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.log(error);
    if (error.response) {
      error.message = error.response.data?.message || 'An error occurred';
    } else if (error.request) {
      // The request was made but no response was received
      error.message = 'No response from the server';
    } else {
      // Something happened in setting up the request that triggered an Error
      error.message = 'Request configuration error';
    }
    return Promise.reject(error);
  }
);

export default api;
