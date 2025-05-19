import { Link, useNavigate } from 'react-router-dom';
import StudentList from '../pages/StudentList.jsx';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';
import { useState } from 'react';
import logo from '../assets/logo.png';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const drops = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  return (
    <nav>
      <link rel="icon" href={logo} />
      <Link to="/" className="no-line">
        <div className="logo">
          <h1>
            <img src={logo} alt="rp logo" /> <p>STUDENTSYNC </p>
          </h1>
        </div>
      </Link>
      <div className="icon" onClick={drops}>
        <MenuIcon />
      </div>
      <div className={`links ${isOpen ? 'menu' : ''}`}>
        <Link to="/">
          <button className="button-3">Home</button>
        </Link>{' '}
        <button onClick={() => navigate('/Add_student')} className="button-1">
          Add Student
        </button>
        <Link to="/pages">
          <button className="button-2">All Students</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
