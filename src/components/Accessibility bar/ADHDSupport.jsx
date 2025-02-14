// ADHDSupport.js
import React, { useEffect, useState } from 'react';
import './ADHDSupport.css';
import adhdImage from "./images/adhd.png"

const ADHDSupport = () => {
  const [adhdSupportEnabled, setADHDSupportEnabled] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === '$' ) {
        toggleADHDSupport();
      }
    };

    const handleScroll = () => {
      updateSpotlightPosition();
    };

    if (adhdSupportEnabled) {
      document.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
      document.body.classList.add('adhd-support-active');
      addSpotlightElement();
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('adhd-support-active');
      removeSpotlightElement();
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('adhd-support-active');
      removeSpotlightElement();
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [adhdSupportEnabled]);

  const toggleADHDSupport = () => {
    setADHDSupportEnabled(!adhdSupportEnabled);
  };

  const handleMouseMove = (event) => {
    const cursorSpotlight = document.getElementById('cursor-spotlight');
    if (cursorSpotlight) {
      cursorSpotlight.style.top = `${window.scrollY + event.clientY}px`;
    }
  };

  const updateSpotlightPosition = () => {
    const cursorSpotlight = document.getElementById('cursor-spotlight');
    if (cursorSpotlight) {
      cursorSpotlight.style.top = `${window.scrollY + cursorSpotlight.getBoundingClientRect().top}px`;
    }
  };

  const addSpotlightElement = () => {
    const spotlight = document.createElement('div');
    spotlight.id = 'cursor-spotlight';
    document.body.appendChild(spotlight);
  };

  const removeSpotlightElement = () => {
    const spotlight = document.getElementById('cursor-spotlight');
    if (spotlight) {
      document.body.removeChild(spotlight);
    }
  };

  return (
    <div onClick={toggleADHDSupport} style={{ cursor: 'pointer' }}>
      <img src={adhdImage} alt="ADHD Support" className={adhdSupportEnabled ? 'adhd-enabled' : ''} style={{width:'35px'}} />
    </div>
  );
};

export default ADHDSupport;
