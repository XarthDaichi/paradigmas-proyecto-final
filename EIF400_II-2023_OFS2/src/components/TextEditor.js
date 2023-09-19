import React, { useState } from 'react';

import '../App.css';

import KeywordChecker from './KeywordChecker'; 
import ScriptPopup from './ScriptPopup'; 


import {API_SERVER_URL} from './Url';

// import fs from 'fs';

const TextEditor = ({ keywordsList }) => { 
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');



  const handleClear = () => {
    const confirmed = window.confirm('Are you sure you want to clear the text?');
    if (confirmed) {
      setInputText('');
      setOutputText('');
    }
  };

  const handleInputChange = (e) => {
      
    const newText = e.target.value;
    const words = newText.split(/\s+/); 
    

    // This nasty imperative loop should be rewritten using FP!
    let processedText = '';
    for (let word of words) {
      const trimmedWord = word.trim();
      if (keywordsList.includes(trimmedWord)) {
        processedText += `${trimmedWord} `;
      }
    }

    setInputText(newText);
    setOutputText(processedText);
  };
  
  const handleSendToServer = () => {
    // 
    fetch(`${API_SERVER_URL}/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText }),
    })
      .then((response) => response.json())
      .then((data) => setOutputText(data.result))
      .catch((error) => console.error('Error sending data to server:', error));
  };

  const handleSaveScript = () => {
    setIsPopupOpen(true);
  };

  
  const handleSaveScriptPopup = (scriptName) => {

    if (scriptName.trim() === '') {
      setErrorMessage('El nombre del script no puede estar vacío');
      return;
    }

    if (inputText.trim() === '') {
      setErrorMessage('El contenido del script no puede estar vacío');
      return;
    }
    
    const newScript = {
      name: scriptName,
      text: inputText,
    };

  
    fetch(`${API_SERVER_URL}/scripts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newScript),
    })
      .then((response) => response.json())
      .then((data) => {
        setOutputText(data.message);
        setIsPopupOpen(false); 
        setErrorMessage('');
      })
      .catch((error) => console.error('Error sending data to server:', error));
  };

  return (
    <div className="center-container"> 
    <div className="custom-container">
      <textarea
        id="TI"
        className="custom-textarea"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Insertar codigo aquí..."
      />
      <div className="arrow">→</div>
      <textarea
        id="TO"
        className="custom-textarea bg-black text-white"
        readOnly
        value={outputText}
      />
      <KeywordChecker text={inputText} />
      <div className="custom-buttons">
        <button onClick={handleClear}>Clear All</button>
        <button onClick={handleSendToServer}>Send to Server</button>
        <button onClick={handleSaveScript}>Save Script</button>
      </div>
      {isPopupOpen && <ScriptPopup onSave={handleSaveScriptPopup} />}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
    </div>
  );
};

export default TextEditor;
