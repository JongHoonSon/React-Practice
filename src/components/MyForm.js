import React from "react";

const MyForm = ({ onChange }) => {
  return (
    <div>
      <span>이름: </span>
      <input onChange={onChange}></input>
    </div>
  );
};

export { MyForm };
