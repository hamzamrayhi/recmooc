import React, { useState, useEffect } from "react";
import FontSizeControl from "./FontSizeControl";
import FontStyleControl from "./FontStyleControl";
import HoverSpeech from "../../components/Accessibility bar/HoverSpeech";
import ProfileManager from "../../components/Accessibility bar/ProfileManager";
import ADHDSupport from "../../components/Accessibility bar/ADHDSupport";
import ResetControl from "./ResetControl";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "./Accessibilitybar.css"; // Import CSS file for styling

const AccessibilityBar = () => {
  const [originalFontSize, setOriginalFontSize] = useState(10); // Original font size
  const [fontSize, setFontSize] = useState(originalFontSize); // Current font size
  const [fontStyle, setFontStyle] = useState("Arial"); // Default font style
  const [contrast, setContrast] = useState("normal"); // Default contrast
  const [showFontStyleOptions, setShowFontStyleOptions] = useState(false); // State to manage visibility of font style options
  const [showFontSizeControls, setShowFontSizeControls] = useState(false);
  const [showResetControls, setShowResetControls] = useState(false);
  const [showFontStyleControls, setShowFontStyleControls] = useState(false);
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const [alertOpen, setAlertOpen] = useState({ max: false, min: false }); // State to manage alert visibility

  const fontStyles = ["Arial", "Times New Roman", "Verdana", "Courier New"]; // Add more font styles as needed

  const MAX_FONT_SIZE = 20; // Define the maximum font size
  const MIN_FONT_SIZE = 6; // Define the minimum font size

  // Function to increase font size
  const increaseFontSize = () => {
    setFontSize((prevSize) => {
      if (prevSize >= MAX_FONT_SIZE) {
        setAlertOpen({ ...alertOpen, max: true });
        return prevSize;
      }
      return prevSize + 1;
    });
  };

  // Function to decrease font size
  const decreaseFontSize = () => {
    setFontSize((prevSize) => {
      if (prevSize <= MIN_FONT_SIZE) {
        setAlertOpen({ ...alertOpen, min: true });
        return prevSize;
      }
      return Math.max(prevSize - 1, MIN_FONT_SIZE);
    });
  };

  // Function to reset font size, font style, contrast, and color blind mode
  const resetChanges = () => {
    setFontSize(originalFontSize);
    setFontStyle("Arial");
    setContrast("normal");
    document.body.style.fontFamily = "Arial";
  };

  // Function to toggle font style options visibility
  const toggleFontStyleOptions = () => {
    setShowFontStyleOptions(!showFontStyleOptions);
  };

  // Function to change font style
  const changeFontStyle = (style) => {
    setFontStyle(style);
    setShowFontStyleOptions(false);
    document.body.style.fontFamily = style;
  };

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  // Function to handle closing the alert
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen({ max: false, min: false });
  };

  return (
    <div className="accessibility-bar">
      <ProfileManager
        fontSize={fontSize}
        fontStyle={fontStyle}
        setFontSize={setFontSize} // Pass setFontSize as a prop
        setFontStyle={setFontStyle} // Pass setFontStyle as a prop
        resetChanges={resetChanges} // Pass resetChanges as a prop
      />

      <div className="icons-container">
        <div className="icon-item">
          <button className="menu-button" onClick={() => setShowFontSizeControls(!showFontSizeControls)}>
            Font Size
          </button>
          {showFontSizeControls && (
            <FontSizeControl
              increaseFontSize={increaseFontSize}
              decreaseFontSize={decreaseFontSize}
            />
          )}
        </div>

        <div className="icon-item">
          <button className="menu-button" onClick={() => setShowFontStyleControls(!showFontStyleControls)}>
            Font Style
          </button>
          {showFontStyleControls && (
            <FontStyleControl
              fontStyles={fontStyles}
              toggleFontStyleOptions={toggleFontStyleOptions}
              showFontStyleOptions={showFontStyleOptions}
              changeFontStyle={changeFontStyle}
            />
          )}
        </div>
        <div className="icon-item">
          <button className="menu-button" onClick={() => setShowResetControls(!showResetControls)}>
            Reset Changes
          </button>
          {showResetControls && (
            <ResetControl resetChanges={resetChanges} />
          )}
        </div>

        <div className="icon-item">
          <button className="menu-button" onClick={() => setShowOtherOptions(!showOtherOptions)}>
            Other Accessibility Toolbar Options
          </button>
          {showOtherOptions && (
            <>
              <HoverSpeech />
              <ADHDSupport />
            </>
          )}
        </div>
      </div>

      {/* Snackbar for alerting user */}
      <Snackbar open={alertOpen.max} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
          You have reached the maximum font size.
        </Alert>
      </Snackbar>

      <Snackbar open={alertOpen.min} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
          You have reached the minimum font size.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AccessibilityBar;