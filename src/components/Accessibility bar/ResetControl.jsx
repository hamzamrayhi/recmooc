import React from 'react';
import ResetImage from "./images/reset.svg";

const ResetControl = ({ resetChanges }) => {
  return (
    <div className="reset-control">
      <button onClick={resetChanges} title="Reset Changes" aria-label="reset-size" className="icon-button">
        <img src={ResetImage} alt="Reset Changes" style={{ width: "20px" }} />
      </button>
    </div>
  );
};

export default ResetControl;