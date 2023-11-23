import React, { useState } from 'react';

const ScriptPopup = ({ onSave, onClose  }) => {
  const [scriptName, setScriptName] = useState('');

  const handleSave = () => {
    onSave(scriptName);
    setScriptName(scriptName);
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Guardar Script</h5>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del Script"
              value={scriptName}
              onChange={(e) => setScriptName(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScriptPopup;
