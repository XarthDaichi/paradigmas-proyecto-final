import React, { useState } from 'react';

import '../App.css';

import KeywordChecker from './KeywordChecker'; 
import ScriptPopup from './ScriptPopup'; // Importa el componente ScriptPopup aquí


import {API_SERVER_URL} from './Url';

// import fs from 'fs';

const TextEditor = ({ keywordsList }) => { 
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);



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

  // Esta función se llamará cuando el usuario ingrese el nombre del script en el popup
  const handleSaveScriptPopup = (scriptName) => {
    // Crea un objeto con el nombre del script y el texto de entrada
    const newScript = {
      name: scriptName,
      text: inputText,
    };

    // Envía el nuevo script al servidor
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
        setIsPopupOpen(false); // Cierra el popup después de guardar el script
      })
      .catch((error) => console.error('Error sending data to server:', error));
  };

  return (
    <div className="custom-container">
      <textarea
        id="TI"
        className="custom-textarea"
        value={inputText}
        onChange={handleInputChange}
        placeholder=""
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
        <button onClick={handleSaveScript} style={{ backgroundColor: 'lightblue' }}>
          Save Script
        </button>
      </div>
      {isPopupOpen && <ScriptPopup onSave={handleSaveScriptPopup} />}
    </div>
  );
};

export default TextEditor;
