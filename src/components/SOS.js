import React from "react";
import { useState } from "react";

const SOS = ({ onSOS }) => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    if (count >= 2) {
      onSOS();
    }
    setCount(count + 1);
  };

  return (
    <button onClick={handleClick}>
      세 번 누르면 긴급호출(현재 {count} 번)
    </button>
  );
};

export { SOS };
