import React, { useState } from 'react';
import AccessibilityBar from '../components/Accessibility bar/Accessibilitybar';
import myImage from '../share/images/accessibility-icon.png';

function AccessibilitybarContainer() {
  const [isAccessibilityBarOpen, setIsAccessibilityBarOpen] = useState(false);

  const toggleAccessibilityBar = () => {
    setIsAccessibilityBarOpen(!isAccessibilityBarOpen);
  };

  return (
    <div>
      <div className="icon-wrapper" onClick={toggleAccessibilityBar}>
        <img
          src={myImage}
          alt="Accessibility Icon"
          style={{
            width: '50px',
            height: '50px',
            position: 'fixed', // Keep the image fixed
            top: '80px', // Adjust as needed
            left: '0px', // Adjust as needed
            zIndex: '1000', // Make sure it appears above other elements
          }}
        />
      </div>
      {isAccessibilityBarOpen && <AccessibilityBar />}
    </div>
  );
}

export default AccessibilitybarContainer;
