import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white border-top mb-0">
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-4">
            <h5 style={{ color: 'white', fontWeight: 'bold' }}>Navigation</h5>
            <ul className="list-unstyled">
              <li><a href="http://localhost:3000/" style={{ color: 'white', textDecoration: 'none' }}>Home</a></li>
              <li><a href="http://localhost:3000/product#" style={{ color: 'white', textDecoration: 'none' }}>Shop</a></li>
              <li><a href="http://localhost:3000/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</a></li>
              <li><a href="http://localhost:3000/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 style={{ color: 'white', fontWeight: 'bold' }}>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}><i className="fab fa-facebook-f"></i> Facebook</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}><i className="fab fa-twitter"></i> Twitter</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}><i className="fab fa-instagram"></i> Instagram</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}><i className="fab fa-linkedin"></i> LinkedIn</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 style={{ color: 'white', fontWeight: 'bold' }}>Contact Us</h5>
            <address style={{ color: 'white' }}>
              123 Main Street<br />
              City, State, Zip<br />
              Phone: (123) 456-7890<br />
              Email: info@example.com
            </address>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 text-center">
            <p style={{ color: 'white' }}>&copy; 2024 Your E-commerce Website. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
