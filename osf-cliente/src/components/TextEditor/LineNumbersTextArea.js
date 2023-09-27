import React, { useState } from 'react';

const LineNumbersTextArea = ({ value })=> {  
  return (
    <textarea
      className="custom-textarea-lines"
      value={value}
      style={{
        zIndex: 1,
      }}
      readOnly
    />
  );
};

export default LineNumbersTextArea;
