import React, { useState } from 'react';

function LineNumbersTextArea({ value, onChange }) {
  const lines = value.split('\n');
  
  return (
    <div className="line-numbers-text-area">
      <div className="line-numbers">
        {lines.map((_, index) => (
          <div key={index} className="line-number">
            {index + 1}
          </div>
        ))}
      </div>
      <textarea
        value={value}
        onChange={onChange}
        className="text-area"
      />
    </div>
  );
}

export default LineNumbersTextArea;
