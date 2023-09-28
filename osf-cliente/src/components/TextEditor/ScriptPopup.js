import React, { useState } from 'react';

const ScriptPopup = ({ onSave }) => {
  const [scriptName, setScriptName] = useState('');

  const handleSave = () => {
    onSave(scriptName);
    setScriptName(scriptName);
  };

  return (
    <div style={{ marginLeft: '30%' }} > 
    <div className="script-popup">
      <input
        type="text"
        placeholder="Nombre del script"
        value={scriptName}
        onChange={(e) => setScriptName(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
    </div>
  );
};

export default ScriptPopup;
