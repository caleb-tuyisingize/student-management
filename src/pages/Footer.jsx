import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import FmdFacebookIcon from '@mui/icons-material/Facebook';
import FmdYouTubeIcon from '@mui/icons-material/YouTube';
import FmdInstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';
import './styles/footer.css';

const FooterPart = () => {
  return (
    <>
      <div className="background_color_all">
        <div className="grid-column">
          <div className="first-all-paragraph">
            <h3>STUDENTSYNC MANAGEMENT APP</h3>
            <br />
            <h6>Students management platform</h6>
            <br />
            <h4>Our Address</h4>
            <br />
            <div className="flex-wrap">
              <FmdGoodOutlinedIcon />
              <p className="first-paragraph">
                {' '}
                Gasabo District, Kinyina Sector, Murama Cell,Rusenyi Village
              </p>
            </div>
            <br />
            <div className="flex-wrap">
              <ExpandCircleDownOutlinedIcon />
              <p className="first-paragraph">Working hours: Monday-Friday 08:00-17:00</p>
            </div>
          </div>
          <div className="second-all-paragraph">
            <h4>Contact Us </h4>
            <br />
            <div className="flex-wrap">
              <MailOutlinedIcon />
              <p className="inf-container"> info@thegymcrapstone.rw</p>
            </div>
            <br />
            <div className="flex-wrap">
              <CallOutlinedIcon />
              <p className="inf-container">0788-322-223</p>
            </div>
          </div>
          <div className="third-all-paragraph">
            <h4 className="sacial-container">Social Media</h4>
            <div className="icon-container">
              <span className="all-icon">
                <Link to="http://www.facebook.com/" className="ico" target="_blank">
                  {' '}
                  <FmdFacebookIcon />
                </Link>
              </span>
              <span className="all-icon">
                <Link
                  to="http://www.youtube.com/@rwandapolytechnic5110"
                  target="_blank"
                  className="ico"
                >
                  {' '}
                  <FmdYouTubeIcon />
                </Link>
              </span>
              <span className="all-icon">
                <Link
                  to="https://www.instagram.com/rp_tumba_college?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  className="ico"
                  target="_blank"
                >
                  {' '}
                  <FmdInstagramIcon />
                </Link>{' '}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterPart;
