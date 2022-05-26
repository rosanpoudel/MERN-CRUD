import React from "react";

const InputFeild = ({ label, type, placeholder, onChange, name, value }) => {
  return (
    <div className="form-row">
      <label className="label">{label}</label>
      <input
        className="input"
        type={type}
        placeholder={placeholder || ""}
        onChange={onChange}
        name={name}
        value={value}
      />
    </div>
  );
};

export default InputFeild;
