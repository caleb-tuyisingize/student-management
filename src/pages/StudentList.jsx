import { useEffect, useState } from 'react';
import '../components/Navbar.css';
import RefreshIcon from '@mui/icons-material/Refresh';
import './style/StudentList.css';
import useStudentStore from '../store/studentStore';
import { studentService } from '../lib/api';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Addstudent from './Add_student.jsx';
import Pagination from './pagination.jsx';

const StudentList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { students, fetchStudents, loading, error } = useStudentStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(7);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = students.slice(firstPostIndex, lastPostIndex);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [msgDisplay, setMessageDisplay] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const mssg = 'NO RESULT FOUND ';
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const myMsg = location.state?.myMsg;
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const toggleModal = () => {
    setModal(!modal);
  };
  const handleChange = e => {
    setSearch(e.target.value);
  };
  const handleUpdate = data => {
    navigate('/student-profile', { state: { studentData: data } });
  };
  const deleteNow = () => {
    setIsDeleted(!isDeleted);
  };
  const refresh = () => {
    window.location.reload();
  };
  const handleDelete = async studentId => {
    try {
      const data = await studentService.deleteStudent(studentId);
      if (data) {
        console.log(data);
        window.location.reload();
        alert('delete successfully');
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      console.error('Error deleting student', err);
      alert('Failed to delete student');
    }
  };

  const filteredStudents = currentPost.filter(student => {
    const query = search.trim().toLowerCase();
    return (
      student.firstName.toLowerCase().includes(query) ||
      student.lastName.toLowerCase().includes(query)
    );
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessageDisplay(myMsg);
      navigate(location.pathname, { replace: true });
    }, 5000);

    return () => clearTimeout(timer);
  }, [myMsg, navigate, location]);
  if (loading)
    return (
      <center>
        {' '}
        <div className="loading">
          <RefreshIcon />
        </div>
      </center>
    );

  if (error)
    return (
      <div className="connection--error">
        <h2>
          <b>Connection Failed</b>
        </h2>
        <p>Check your connection to the internet and try again.</p>
        <br />
        <br />
        <button onClick={refresh} className="retry">
          Retry
        </button>
      </div>
    );

  return (
    <>
      {msgDisplay == true && myMsg ? (
        <p className="update-msg">{myMsg}</p>
      ) : (
        <p className="update-none">{msgDisplay}</p>
      )}

      <div className={isDeleted ? 'delete' : 'now'}>
        <h2>Are you Sure you want to remove this student?</h2>
        <br />
        <div className="joy">
          <button
            className="cancel"
            onClick={() => {
              deleteNow(false);
              setStudentToDelete(null);
            }}
          >
            Cancel
          </button>
          <button
            className="yes"
            onClick={() => {
              handleDelete(studentToDelete.studentId);
              deleteNow(false);
              setStudentToDelete(null);
            }}
          >
            Yes
          </button>
        </div>
      </div>
      <div className="container">
        <div className="top">
          <h1>All Students</h1>

          <div className="leftbar">
            <section className="search">
              <SearchIcon className="ii" />
              &nbsp;&nbsp;
              <input
                type="text"
                name="Search"
                id=""
                placeholder="Search"
                value={search}
                onChange={handleChange}
              />
            </section>

            <button className="add" onClick={toggleModal}>
              {' '}
              <AddIcon className="ic" /> &nbsp; <p> Add Student </p>
              <br />
            </button>
          </div>
        </div>
        <br />
        <br />
        <div className="scroller">
          <table className="tables" cellSpacing={0}>
            <thead>
              <tr className="thead">
                <th>User name</th>
                <th>Student ID</th>
                <th>Enrollment date</th>
                <th>Status</th>
                <th colSpan={2} className="table-head">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map(item => (
                  <tr key={item.id}>
                    <td className="name-of">
                      <div onClick={() => handleUpdate(item)} className="proPic">
                        {item.firstName.charAt(0).toUpperCase()}
                        {item.lastName.charAt(0).toUpperCase()}
                      </div>
                      {item.firstName + ' ' + item.lastName}
                    </td>
                    <td>{item.studentId}</td>
                    <td>{item.enrollmentDate}</td>
                    <td>Enrolled</td>

                    <td className="editz">
                      <EditIcon className="ed" onClick={() => handleUpdate(item)} />
                    </td>
                    <td className="deletez">
                      <DeleteIcon
                        className="de"
                        onClick={() => {
                          deleteNow(true);
                          setStudentToDelete(item);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="dd">
                    {mssg}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <br />
      </div>
      <Pagination totalPosts={students.length} postPerPage={postPerPage} paginate={paginate} />
      {modal && (
        <div className="modal">
          <div className="overlay">
            <Addstudent />
          </div>
        </div>
      )}
    </>
  );
};
export default StudentList;
