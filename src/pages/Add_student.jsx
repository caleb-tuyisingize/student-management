import './style/Add_student.css';
import { studentService } from '../lib/api';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const Addstudent = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const studentData = location.state?.studentData;

  const [formValues, setFormValues] = useState(studentData || {});

  const handleSubmit = e => {
    const { name, value } = e.target;

    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const newd = new Date().toISOString().split('T')[0];
  const handleSubmits = async e => {
    e.preventDefault();
    try {
      if (formValues.contactNumber.length !== 10) {
        alert('contact number have to be exactly to 10');
        return;
      }

      if (formValues.studentId.length !== 8) {
        alert('student id has to be 8 numbers');
        return;
      }
      const result = await studentService.createStudent(formValues);
      if (result.success) {
        alert('student added');
        navigate('/');
      } else {
        alert('Make sure that all inputs are filled and are unique');
      }
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Submission failed');
    }
  };
  return (
    <div className="add-color">
      <form className="handle-full-color">
        <div className="final-title">
          <div className="handle-title">
            <img src="./src/assets/title.png" className="handle-picture" alt="wait" />
            <p className="set-position">STUDENTSYNC</p>
          </div>
          <p>Add new student</p>
        </div>
        <div className="form-body">
          <div className="handle-display">
            <div>
              <label htmlFor="firstName">First name</label>
              <br />
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="handle-size-form"
                value={formValues.firstName}
                onChange={handleSubmit}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last name</label>
              <br />
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="handle-size-form"
                value={formValues.lastName}
                onChange={handleSubmit}
              />
            </div>
            <div>
              <label htmlFor="dob">Date Of Birth</label>
              <br />
              <input
                type="date"
                id="dob"
                name="dateOfBirth"
                min="1990-01-01"
                max="2007-01-01"
                className="handle-size-form date-birth"
                value={formValues.dob}
                onChange={handleSubmit}
              />
            </div>
            <div>
              <label htmlFor="studentId">Student ID</label>
              <br />
              <input
                type="text"
                id="studentId"
                name="studentId"
                className="handle-size-form"
                value={formValues.studentId}
                onChange={handleSubmit}
              />
            </div>
          </div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            className="handle-size"
            value={formValues.email}
            onChange={handleSubmit}
          />
          <br />
          <br />
          <label htmlFor="contact">Contact number</label>
          <br />
          <input
            type="tel"
            id="contact"
            name="contactNumber"
            max={10}
            className="handle-size"
            maxLength={10}
            value={formValues.contactNumber}
            onChange={handleSubmit}
          />
          <br />
          <br />
          <label htmlFor="enrollDate">Enrollment date</label>
          <br />
          <input
            type="date"
            id="enrollDate"
            name="enrollmentDate"
            min="2024-05-08"
            max={newd}
            className="handle-size"
            value={formValues.enrollmentDate}
            onChange={handleSubmit}
          />
          <br />
          <br />
          <div className="handle-button">
            <button className="button-width" onClick={handleSubmits}>
              Add
            </button>
            <button className="button-color" onClick={() => navigate('/pages')}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Addstudent;
