'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#A04E95] text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} ShopWave. All rights reserved.</p>
        <p>Contact: test@example.com</p>
      </div>
    </footer>
  );
};

export default Footer;
