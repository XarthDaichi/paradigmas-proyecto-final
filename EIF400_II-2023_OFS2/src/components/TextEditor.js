import React, { useState } from 'react';

import '../App.css';

import KeywordChecker from './KeywordChecker'; 

import {API_SERVER_URL} from './Url';


const TextEditor = ({ keywordsList }) => { 
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

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

  
  return (
    <div className="custom-container">
      <textarea
        id="TI"
        className="custom-textarea"
        value={inputText}
        onChange={handleInputChange}
        placeholder=""
      />
      <textarea id="TO" className="custom-textarea bg-black text-white" readOnly value={outputText} />
      <div className="custom-buttons">
        <button onClick={handleClear}>Clear All</button>
        <button onClick={handleSendToServer}>Send to Server</button>
      </div>

      
      <KeywordChecker text={inputText} />
    </div>
  );
};

export default TextEditor;
