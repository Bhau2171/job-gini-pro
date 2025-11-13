import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <GraduationCap className="w-8 h-8" />
              <span>JobGenie</span>
            </div>
            <p className="footer-description">
              Empowering individuals with data-driven career guidance, 
              professional tools, and personalized insights to navigate 
              their career journey successfully.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="social-link">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="social-link">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Features</h3>
            <ul className="footer-links">
              <li><Link to="/market-insights">Market Insights</Link></li>
              <li><Link to="/resume-builder">Resume Builder</Link></li>
              <li><Link to="/interview-prep">Interview Preparation</Link></li>
              <li><Link to="/dashboard">Career Dashboard</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li><a href="#">Career Guides</a></li>
              <li><a href="#">Industry Reports</a></li>
              <li><a href="#">Skill Assessment</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 JOB-GENIE. All rights reserved.</p>
          <p>Built with ❤️ for career growth and development</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;