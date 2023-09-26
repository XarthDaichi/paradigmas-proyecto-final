import React, { useState, useEffect  } from 'react';

import '../App.css';

import KeywordChecker from './KeywordChecker'; 
import ScriptPopup from './ScriptPopup';
//import LineNumbersTextArea from './LineNumbersTextArea';
import TextStats from './TextStats'; 


import {API_SERVER_URL} from './Url';


const TextEditor = ({ keywordsList }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaved, setIsSaved] = useState(false); 
  const [scriptName, setScriptName] = useState('');
  const [scriptId, setScriptId] = useState('');
  const [availableScriptIds, setAvailableScriptIds] = useState([]);

  const handleClear = () => {
    const confirmed = window.confirm('Are you sure you want to clear the text?');
    if (confirmed) {
      setInputText('');
      setOutputText('');
      setIsSaved(false); 
    }
  };
  const handleRetrieveScript = () => {
    if (!scriptId.trim()) {
      setErrorMessage('Please enter a valid Script ID');
      return;
    }
  
    // Realiza la solicitud al servidor para recuperar el script con el ID proporcionado
    fetch(`${API_SERVER_URL}/script/${scriptId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setErrorMessage(data.message);
        } else {
          // Actualiza el estado de inputText y scriptName con los datos recuperados
          setInputText(data.text);
          setScriptName(data.name);
          setIsSaved(true);
          setErrorMessage(''); // Limpia el mensaje de error en caso de éxito
          setOutputText(''); // Limpia el texto de salida
        }
      })
      .catch((error) => {
        console.error('Error retrieving script from server:', error);
        setErrorMessage('Error retrieving script. Please try again later.');
      });
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

  const handleScriptIdChange = (e) => {
    setScriptId(e.target.value);
    setErrorMessage('');
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
  
  
  const calcularLineaActual = () => {
    const lineas = inputText.split('\n');
    const numeroDeLinea = lineas.findIndex((linea) => linea.includes(inputText)) + 1;
    return numeroDeLinea;
  };

  const calcularTotalDeLineas = () => {
    const lineas = inputText.split('\n');
    return lineas.length;
  };

  const calcularTotalDePalabras = () => {
    const palabras = inputText.split(/\s+/);
    return palabras.length;
  };

  const loadAvailableScriptIds = () => {
    fetch(`${API_SERVER_URL}/available-script-ids`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Available Script IDs:', data); // Agrega esta línea
        setAvailableScriptIds(data.availableIds);
      })
      .catch((error) => {
        console.error('Error loading available script IDs:', error);
      });
  };
  

  useEffect(() => {
  
    const lineaActual = calcularLineaActual();
    const totalLineas = calcularTotalDeLineas();
    const totalPalabras = calcularTotalDePalabras();
    loadAvailableScriptIds();

  }, [inputText]);

  return (
    <div className="center-container">
      <div className="custom-container">
        <textarea
          id="TI"
          className="custom-textarea"
          value={inputText}
          onChange={handleInputChange}
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
          <button onClick={handleRetrieveScript}>Retrieve Script</button>
          <label>Select Script ID:</label>
                    <select
                      value={scriptId}
                      onChange={handleScriptIdChange}
                    >
                      <option value="">Select an ID</option>
                      {availableScriptIds.map((id) => (
                        <option key={id} value={id}>
                          {id}
                        </option>
                      ))}
                    </select>
          
          </div>
        {isPopupOpen && <ScriptPopup onSave={handleSaveScriptPopup} />}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <div className="info-box">
        <TextStats
            filename={scriptName}
            currentLine={calcularLineaActual()}
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
