import './style/index.css';
import img4 from '../assets/forum4.jpg';
import img3 from '../assets/forum3.jpg';
import img2 from '../assets/forum2.jpg';
import img1 from '../assets/forum1.jpg';
import img5 from '../assets/achievement.jpg';
import img6 from '../assets/sports.jpg';
import img7 from '../assets/culture.jpg';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
const LandingPage = () => {
  return (
    <>
      <main>
        <section className="section main-header">
          <div className="main-title desc">
            <div className="text">
              <p className="header-name green">Students management platform</p>
              <h1 className="pro-name dack-green">STUDENTSYNC MANAGEMENT WEB APP</h1>
              <p className="danger">Student for Academic Year 2025/2026</p>
            </div>
            <div className="buttons">
              <div className="btn-f">
                <Link to="https://www.iprctumba.rp.ac.rw/" target="_blank">
                  <button className="btn bg-white">Learn More</button>
                </Link>
                <Link to="/pages">
                  <button className="btn bg-green">All Students</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="main-img img">
            <div className="big-img">
              <img src={img1} alt="" />
            </div>
            <div className="sub-main">
              <div>
                <img src={img2} alt="" />
              </div>
              <div>
                <img src={img3} alt="" />
              </div>
              <div>
                <img src={img4} alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="section vibrant-culture">
          <div className="vib-header">
            <p className="green">Vibrant Culture</p>
            <h2 className="dack-green">RP Tumba College Students management</h2>
          </div>
          <div className="vib-main">
            <div className="cards">
              <div className="card">
                <div className="card-header">
                  <div className="icon icon-danger danger-danger">
                    <VolunteerActivismIcon />
                  </div>
                  <h3>Race Towards Goodness</h3>
                </div>
                <div className="card-main">
                  <p>
                    Digital transformation empowers students with tools and skills that extend
                    beyond technical proficiency, fostering a learning environment where ethical
                    digital citizenship and proper online conduct become the bedrock of their future
                    success in an increasingly connected world.
                  </p>
                </div>
              </div>
              <div className="card pink">
                <div className="card-header">
                  <div className="icon icon-white cl-white">
                    <AccessAlarmIcon />
                  </div>
                  <h3>Disciplined and Productive</h3>
                </div>
                <div className="card-main">
                  <p>
                    Discipline in time, as well as discipline in all matters and possessions.
                    Organized and able to manage their agenda/activities so that all their time can
                    be valuable and beneficial.
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <div className="icon icon-brown cl-brown">
                    <DirectionsRunIcon />
                  </div>
                  <h3>Disciplined and Productive</h3>
                </div>
                <div className="card-main">
                  <p>
                    Competing and striving in goodness. Having speed and accuracy in doing good
                    deeds. Trained to act swiftly in matters, completing tasks quickly and
                    efficiently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section gallery">
          <div className="gallery-header">
            <p className="green">Gallery</p>
            <h2 className="dack-green">The Gym College Students lifestyle</h2>
            <div className="scroll">
              <ul className="all--lists">
                <li>All</li>
                <li>Foundations period</li>
                <li>Sport culture</li>
                <li>Projects phase</li>
              </ul>
            </div>
          </div>
          <div className="gallery-main">
            <div className="gallery-card found">
              <img src={img5} alt="" />
              <div className="gallery-footer cl-white">
                <p>Foundation Culture</p>
              </div>
              <div className="gallery-icon cl-white">
                <VisibilityIcon />
              </div>
            </div>
            <div className="gallery-card sport">
              <img src={img6} alt="" />
              <div className="gallery-footer cl-white">
                <p>Sport Culture</p>
              </div>
              <div className="gallery-icon cl-white">
                <VisibilityIcon />
              </div>
            </div>
            <div className="gallery-card culture">
              <img src={img7} alt="" />
              <div>
                <div className="gallery-footer cl-white ">
                  <p>Country Culture</p>
                </div>
                <div className="gallery-icon cl-white">
                  <VisibilityIcon />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingPage;
