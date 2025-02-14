import React from 'react';
import fontSizeIncreaseImage from "./images/font-increase.svg";
import fontSizeDecreaseImage from "./images/font-decrease.svg";
import"./FontSizeControl.css";

const FontSizeControl = ({ increaseFontSize, decreaseFontSize, resetChanges }) => {
  return (
    <div className="font-size-control">
      <button onClick={increaseFontSize} title="Increase Font Size" aria-label="increase size" className="icon-button">
        <img src={fontSizeIncreaseImage} alt="Increase Font Size" style={{ width: "30px" }} />
      </button>
      <button onClick={decreaseFontSize} title="Decrease Font Size" aria-label="decrease size" className="icon-button">
        <img src={fontSizeDecreaseImage} alt="Decrease Font Size" style={{ width: "30px" }} />
      </button>
    </div>
  );
};

export default FontSizeControl;