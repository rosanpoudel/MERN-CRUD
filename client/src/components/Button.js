import React from "react";

const Button = ({ disabled, label, onClick, loading }) => {
  return (
    <button className="c-button" disabled={disabled} onClick={onClick}>
      {!loading ? (
        label
      ) : (
        <svg className="spinner" viewBox="0 0 50 50">
          <circle
            class="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="5"
          ></circle>
        </svg>
      )}
    </button>
  );
};

export default Button;
