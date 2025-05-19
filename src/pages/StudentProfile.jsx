import React, { useState } from 'react';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import './styles/StudentProfile.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { studentService } from '../lib/api';
import WestIcon from '@mui/icons-material/West';

const StudentProfileForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const studentData = location.state?.studentData;

  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState(studentData || {});
  const [enrollmentDateForDisplay, setEnrollmentDateForDisplay] = useState(
    studentData?.enrollmentDate || ''
  );

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isEditing) {
      const data = studentService.updateStudent(formValues.id, formValues);
      if (data) {
        setEnrollmentDateForDisplay(formValues.enrollmentDate);
        const msg = `${formValues.firstName} updated successfully!`;
        navigate('/pages', { state: { myMsg: msg } });
      } else {
        alert('Error updating student');
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const getTimeAgo = dateString => {
    if (!dateString) return '';
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 1) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;

    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks === 1) return '1 week ago';
    if (diffWeeks < 4) return `${diffWeeks} weeks ago`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return '1 month ago';
    if (diffMonths > 1) return `${diffMonths} months ago`;
    const year = Math.floor(diffMonths / 12);
    if (year === 1) return '1 year ago';
    return `${year}years ago`;
  };
  return (
    <>
      {studentData ? (
        <div>
          <div className="part1">
            <div className="welcome">
              WELCOME {studentData.firstName} {studentData.lastName}. !
            </div>
            <p>{new Date().toDateString()}</p>
          </div>

          <div className="content">
            <div className="part3">
              <div className="details">
                <input type="file" id="imageInput" accept="image/*" />
                <label htmlFor="Profile" id="imageLabel">
                  <div className="img">
                    {studentData.firstName.charAt(0).toUpperCase()}
                    {studentData.lastName.charAt(0).toUpperCase()}
                  </div>
                </label>
                <strong>
                  {studentData.firstName} {studentData.lastName}
                </strong>
                <p>{studentData.email}</p>
              </div>
            </div>

            <div className="form-container">
              <h2>Student Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-columns">
                  <div className="form-left">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formValues.firstName}
                        onChange={handleChange}
                        readOnly={!isEditing}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="studentId">Student ID</label>
                      <input
                        type="text"
                        name="studentId"
                        id="studentId"
                        value={formValues.studentId}
                        onChange={handleChange}
                        readOnly={!isEditing}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="enrollmentDate">Enrollment Date</label>
                      <input
                        type="date"
                        name="enrollmentDate"
                        id="enrollmentDate"
                        value={formValues.enrollmentDate}
                        onChange={handleChange}
                        readOnly={!isEditing}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contactNumber">Contact Number</label>
                      <input
                        type="text"
                        name="contactNumber"
                        id="contactNumber"
                        value={formValues.contactNumber}
                        onChange={handleChange}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="form-right">
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formValues.lastName}
                        onChange={handleChange}
                        readOnly={!isEditing}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="dob">Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        value={formValues.dob}
                        onChange={handleChange}
                        readOnly={!isEditing}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formValues.email}
                        onChange={handleChange}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <button className="but1" type="submit">
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </form>

              <div className="myemail">
                <ContactMailIcon />
                <div>
                  <p>{studentData.email}</p>
                  <p>{getTimeAgo(enrollmentDateForDisplay)}</p>
                </div>
              </div>

              <div className="goback">
                <button onClick={handleGoBack}>
                  <WestIcon /> Go back
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No student data available.</p>
      )}
    </>
  );
};

export default StudentProfileForm;
