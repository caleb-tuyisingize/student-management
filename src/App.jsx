import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentProfileForm from './pages/StudentProfile';
import './App.css';
import FooterPart from './pages/Footer.jsx';
import Navbar from './components/Navbar';
import StudentList from './pages/StudentList';

import LandingPage from './pages/index.jsx';
import Addstudent from './pages/Add_student.jsx';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pages" element={<StudentList />} />
            <Route path="/student-profile" element={<StudentProfileForm />} />
            <Route path="/Add_student" element={<Addstudent />} />
          </Routes>
        </main>
        <FooterPart />
      </div>
    </Router>
  );
};

export default App;
