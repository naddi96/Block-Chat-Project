import React from "react";

const PopUp = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-container">
        {children}
        <button className="compra-button" onClick={handleClose}>
          chiudi
        </button>
      </div>
    </div>
  );
};

export default PopUp;