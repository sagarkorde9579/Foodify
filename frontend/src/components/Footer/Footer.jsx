import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { useNavigate,Link } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate();

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  return (
    <footer className='footer' id='footer'>
      <div className='footer-content'>

        <div className='footer-content-left'>
          {/* <img src={assets.logo} alt="Zomato Logo" /> */}
            <Link to="/" className="logo">
  Foodify
</Link>

          <p>
            Zomato helps you discover the best food & drinks in your city.
            Order your favorite meals, explore trending restaurants, and enjoy
            fast delivery with trusted reviews — all in one place.
          </p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook" />
            <img src={assets.twitter_icon} alt="twitter" />
            <img src={assets.linkedin_icon} alt="linkedin" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => handleScroll("explore-menu")}>Menu</li>
            <li onClick={() => navigate("/")}>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>Contact</h2>
          <ul>
            <li>📞 +91 9579933423</li>
            <li>📧 sk3397485@gmail.com</li>
            <li>📍 Maharashtra, India</li>
          </ul>
        </div>

      </div>

      <hr />

      <p className='footer-copyright'>
        © 2026 Zomato Clone. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer