import React from "react";

const InputFieldBox = ({ name, className }) => {
  return <div className={className}>{name ?? "-"}</div>;
};

export default InputFieldBox;
