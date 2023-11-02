import React, { useState, useEffect } from "react";

import "../../App.css";

import KeywordChecker from "./KeywordChecker";
import ScriptPopup from "./ScriptPopup";
import TextStats from "./TextStats";

import { API_SERVER_URL } from "../api/Url";

const TextEditor = ({ keywordsList }) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [evalText, setEvalText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [scriptName, setScriptName] = useState("");
  const [currentLineNumber, setCurrentLineNumber] = useState(1);
  const [scripts, setScripts] = useState([]);
  const [selectedScriptId, setSelectedScriptId] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleClear = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear the text?"
    );
    if (confirmed) {
      setInputText("");
      setOutputText("");
      setIsSaved(false);
      setEvalText("");
      setErrorMessage("");
      setIsPopupOpen(false);
      setScriptName("");
      setCurrentLineNumber(1);
      setSelectedScriptId("");
    }
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    const words = newText.split(/\s+/);

    const filteredKeywords = keywordsList.filter((keyword) =>
    keyword.toLowerCase().includes(newText.toLowerCase())
    );

    let processedText = "";
    for (let word of words) {
      const trimmedWord = word.trim();
      if (keywordsList.includes(trimmedWord)) {
        processedText += `${trimmedWord} `;
      }
    }

    setInputText(newText);
    setOutputText(processedText);
    setSuggestions(filteredKeywords);
  };

  const handleRetrieveScript = () => {
    fetch(`${API_SERVER_URL}/script`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setScripts(data);
      })
      .catch((error) =>
        console.error(
          "Error al recuperar nombres de scripts del servidor:",
          error
        )
      );
  };

  const handleLoadSelectedScript = () => {
    fetch(`${API_SERVER_URL}/script/${selectedScriptId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSelectedScriptId(data._id);
        setScriptName(data.name);
        setInputText(data.text);
        setOutputText(""); // Borrar el OutputText si quiere
      })
      .catch((error) =>
        console.error("Error al recuperar scripts del servidor:", error)
      );
  };

  const handleEval = () => {
    const transpiledName = scriptName === "" ? "unamed.js" : scriptName.substring(0, scriptName.length - 4) + '.js'
    const transScript = {
      name : transpiledName,
      text : outputText,
    };
    fetch(`${API_SERVER_URL}/eval`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transScript),
    })
      .then((response) => response.json())
      .then((data) => setEvalText(data.result))
      .catch((error) => console.error("Error sending data to server:", error));
  }

  const handleScriptSelect = (e) => {
    setSelectedScriptId(e.target.value);
  };

  const handleSendToServer = () => {
    const tempId = selectedScriptId === "" ? "-1" : `${selectedScriptId}` 
    const tempName = scriptName === "" ? "unamed.ofs" : scriptName
    const script = {
      _id : tempId,
      name : tempName,
      text : inputText,
    };

    console.log(script)

    fetch(`${API_SERVER_URL}/compile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(script),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data.result); setOutputText(`${data.result.timestamp}\nId:${data.result.id}\nNombre: ${data.result.name}\n${data.result.text}`)})
      .catch((error) => console.error("Error sending data to server:", error));
  };

  const handleSaveScript = () => {
    setIsPopupOpen(true);
  };

  const handleSaveScriptPopup = (scriptName) => {
    if (scriptName.trim() === "") {
      setErrorMessage("El nombre del script no puede estar vacío");
      return;
    }

    if (inputText.trim() === "") {
      setErrorMessage("El contenido del script no puede estar vacío");
      return;
    }
    const newScript = !selectedScriptId ? { name: scriptName, text: inputText, } : {_id: selectedScriptId, name: scriptName, text: inputText};

    console.log("Saving new script:", newScript);

    setScriptName(scriptName);

    setInputText("");
    setIsPopupOpen(false);
    setErrorMessage("");

    if (!selectedScriptId) {
    fetch(`${API_SERVER_URL}/script`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newScript),
    })
      .then((response) => response.json())
      .then((data) => {
        setOutputText(data.message);
        setIsPopupOpen(false);
        setIsSaved(true);
        setErrorMessage("");
      })
      .catch((error) => console.error("Error sending data to server:", error));
    } else {
      fetch(`${API_SERVER_URL}/save/${selectedScriptId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newScript),
      })
        .then((response) => response.json())
        .then((data) => {
          setOutputText(data.message);
          setIsPopupOpen(false);
          setIsSaved(true);
          setErrorMessage("");
        })
        .catch((error) => console.error("Error sending data to server:", error));
    }
    handleRetrieveScript()
  };
  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    const currentCursorPosition = e.target.selectionStart;
    const textBeforeCursor = inputText.substring(0, currentCursorPosition);
    const lines = textBeforeCursor.split("\n");
    const currentLine = lines.length;

    setCurrentLineNumber(currentLine);
  };

  const calcularTotalDeLineas = () => {
    const lineas = inputText.split("\n");
    return lineas.length;
  };

  const calcularTotalDePalabras = () => {
    const palabras = inputText.trim().split(/\s+/);
    return inputText.trim() === "" ? 0 : palabras.length;
  };

  useEffect(() => {
    handleRetrieveScript();
  }, [inputText]);

  const lineNumbers = inputText.split("\n").map((_, index) => (
    <div key={index} className="line-number">
      {index + 1}
    </div>
  ));

  return (
    <div className="center-container">
      <div className="custom-container">
        <div className="text-editor">
          <div className="line-numbers">{lineNumbers}</div>
          <textarea
          id="TI"
          className="custom-textarea"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Insertar código aquí..."
        />
          <ul>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className="suggestion-item"
          >
            {suggestion}
          </li>
        ))}
      </ul>
        <div className="arrow">→</div>
        <textarea
          id="TO"
          className="custom-textarea bg-black text-white"
          readOnly
          value={outputText}
        />
        </div>
        <KeywordChecker text={inputText} 
        evalRes={evalText} />
        <div className="custom-buttons">
          <button onClick={handleClear}>Clear All</button>
          <button onClick={handleSendToServer}>Send to Server</button>
          <button onClick={handleSaveScript}>Save Script</button>
          <button onClick={handleLoadSelectedScript}>Retrieve Script</button>
          <button onClick={handleEval}>Evaluate</button>
          <select onChange={handleScriptSelect} value={selectedScriptId}>
            <option value="">Selecciona un script</option>
            {scripts.map((script) => (
              <option key={script._id} value={script._id}>
                {script._id}-{script.name}
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
