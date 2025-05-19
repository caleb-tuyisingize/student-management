/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { studentService } from '../lib/api';

const useStudentStore = create((set, get) => ({
  students: [],
  student: {},
  loading: false,
  error: null,

  // Fetch all students
  fetchStudents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await studentService.getAllStudents();

      if (response.success) {
        set({ students: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Get single student
  getStudent: async id => {
    set({ loading: true, error: null });
    // implementation goes here
  },

  // Add student
  addStudent: async studentData => {
    set({ loading: true, error: null });
    // implementation goes here
  },

  // Update student
  updateStudent: async (id, studentData) => {
    set({ loading: true, error: null });
    // implementation goes here
  },

  // Delete student
  deleteStudent: async id => {
    set({ loading: true, error: null });
    // implementation goes here
    try {
      const response = await studentService.deleteStudent(id);
      if (response.success) {
        set({ students: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  searchStudents: async query => {
    set({ loading: true, error: null });
    // Implementation goes here
  },
}));

export default useStudentStore;
