import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faInstagram,
  faFacebook,
  faTelegram,
}

  from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-section about">
          <h2 className="title-footer">Picture Place</h2>
          <p className="description-footer">
            PicturePlace is a vibrant platform where you can capture, share, and
            remember your favorite moments. Post stunning pictures, rate and
            review others' uploads, and engage in lively discussions through
            comments. Whether you're showcasing your creativity or discovering
            amazing visuals from around the world, PicturePlace brings people
            together through the power of photography.
          </p>
        </div>

        <div className="footer-section system-pages">
          <h2 className="title-small">System Pages</h2>
          <ul className="list-footer">
            <li>
              <a href="/about" className="systemPageText">About Us</a>
            </li>
            <li>
              <a href="/contact" className="systemPageText">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-section contact-us">
          <h2 className="title-small">Contact Us</h2>
          <ul className="list-footer">
            <li>
              <FontAwesomeIcon icon={faPhone} className="icon" />
              <span>+374 00 10 01 10</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <span>picture-place@gmail.com</span>
            </li>
          </ul>
        </div>

        <div className="footer-section social-media">
          <h2 className="title-small">Follow Us</h2>
          <ul className="list-footer vertical-social-icons">
            <li>
              <a href="https://www.linkedin.com/">
                <FontAwesomeIcon icon={faLinkedin} className="icon linkedin" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/">
                <FontAwesomeIcon icon={faInstagram} className="icon instagram" />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/">
                <FontAwesomeIcon icon={faFacebook} className="icon facebook" />
              </a>
            </li>
            <li>
              <a href="https://web.telegram.org/">
                <FontAwesomeIcon icon={faTelegram} className="icon telegram" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-copyright">
        <p>&copy; 2023 PicturePlace. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;