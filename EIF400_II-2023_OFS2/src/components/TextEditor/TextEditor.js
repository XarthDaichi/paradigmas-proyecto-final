import React, { useState, useEffect  } from 'react';

import '../../App.css';

import KeywordChecker from './KeywordChecker'; 
import ScriptPopup from './ScriptPopup';
import TextStats from './TextStats'; 


import {API_SERVER_URL} from '../api/Url';


const TextEditor = ({ keywordsList }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaved, setIsSaved] = useState(false); 
  const [scriptName, setScriptName] = useState('');
  const [currentLineNumber, setCurrentLineNumber] = useState(1);
  const [scripts, setScripts] = useState([]); 
  const [selectedScriptId, setSelectedScriptId] = useState(''); 

  const handleClear = () => {
    const confirmed = window.confirm('Are you sure you want to clear the text?');
    if (confirmed) {
      setInputText('');
      setOutputText('');
      setIsSaved(false); 
    }
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    const words = newText.split(/\s+/);

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

  const handleRetrieveScript = () => {
    fetch(`${API_SERVER_URL}/script`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setScripts(data);
      })
      .catch((error) => console.error('Error al recuperar nombres de scripts del servidor:', error));
  };

  const handleLoadSelectedScript = () => {
    fetch(`${API_SERVER_URL}/script/${selectedScriptId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInputText(data.text);
        setOutputText(''); // Borrar el OutputText si quiere
      })
      .catch((error) => console.error('Error al recuperar scripts del servidor:', error))
  };

  const handleScriptSelect = (e) => {
    setSelectedScriptId(e.target.value);
  };
  

  const handleSendToServer = () => {
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
      "name": scriptName,
      "text": inputText,
    };

    console.log('Saving new script:', newScript);

    setScriptName(scriptName);

    setInputText('');
    setIsPopupOpen(false);
    setErrorMessage('');

     

    fetch(`${API_SERVER_URL}/script`, {
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
        setIsSaved(true); 
        setErrorMessage('');
      })
      .catch((error) => console.error('Error sending data to server:', error));
  };
  
  const handleKeyDown = (e) => {
    const currentCursorPosition = e.target.selectionStart;
    const textBeforeCursor = inputText.substring(0, currentCursorPosition);
    const lines = textBeforeCursor.split('\n');
    const currentLine = lines.length;
  
    setCurrentLineNumber(currentLine);
  };

  const calcularTotalDeLineas = () => {
    const lineas = inputText.split('\n');
    return lineas.length;
  };

 const calcularTotalDePalabras = () => {
  const palabras = inputText.trim().split(/\s+/);
  return inputText.trim() === '' ? 0 : palabras.length;
};
  

  useEffect(() => {
    handleRetrieveScript();
  }, [inputText]);

  return (
    <div className="center-container">
      <div className="custom-container">
        <textarea
          id="TI"
          className="custom-textarea"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Insertar código aquí..."
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
          <button onClick={handleLoadSelectedScript}>Retrieve Script</button>
          <select onChange={handleScriptSelect} value={selectedScriptId}>
            <option value="">Selecciona un script</option>
            {scripts.map((script) => (
              <option key={script.id} value={script.id}>
                {script.name}
              </option>
            ))}
          </select>
          </div>
        {isPopupOpen && <ScriptPopup onSave={handleSaveScriptPopup} />}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <div className="info-box">
        <TextStats
            filename={scriptName}
            currentLine={currentLineNumber}
            totalLines={calcularTotalDeLineas()}
            totalWords={calcularTotalDePalabras()}
            isSaved={isSaved}
          />
        </div>
        </div>
      </div>
      );
  
};

export default TextEditor;
