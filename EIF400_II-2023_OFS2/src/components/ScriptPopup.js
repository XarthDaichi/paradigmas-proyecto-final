import React, { useState } from 'react';

const ScriptPopup = ({ onSave }) => {
  const [scriptName, setScriptName] = useState('');

  const handleSave = () => {
    onSave(scriptName);
    setScriptName('');
  };

  return (
    <div className="script-popup">
      <input
        type="text"
        placeholder="Enter script name"
        value={scriptName}
        onChange={(e) => setScriptName(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ScriptPopup;
