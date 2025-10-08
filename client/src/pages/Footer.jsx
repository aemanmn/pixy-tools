import React from "react";
import { Helmet } from "react-helmet-async";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 text-center py-6 mt-10">
      <div className="space-x-4">
        <Link to="/about" className="hover:text-blue-500">About</Link>
        <Link to="/contact" className="hover:text-blue-500">Contact</Link>
        <Link to="/privacy-policy" className="hover:text-blue-500">Privacy Policy</Link>
        <Link to="/terms-of-use" className="hover:text-blue-500">Terms of Use</Link>
        <Link to="/blog" className="hover:text-blue-500">Blog</Link>
      </div>

      <p className="text-sm mt-3">
        © {new Date().getFullYear()} Pixy Tools. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
