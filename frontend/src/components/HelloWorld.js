// src/components/HelloWorld.js
import React from 'react';

function HelloWorld() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <h1>Hello, World!</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default HelloWorld;
