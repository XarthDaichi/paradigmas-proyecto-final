import React, { useState, useEffect } from 'react';
import './App.css';
import TextEditor from './components/TextEditor';
import Header from './components/Header';
import About from './components/About'; 

import { API_SERVER_URL } from './components/Url';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

function App() {
  const [keywordsList, setKeywordsList] = useState([]);

  useEffect(() => {
    fetch(`${API_SERVER_URL}/keywords`)
      .then((response) => response.json())
      .then((data) => setKeywordsList(data.keywords))
      .catch((error) => console.error('Error fetching keywords:', error));
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes> 
          <Route path="/" element={<TextEditor keywordsList={keywordsList} />} /> 
          <Route path="/about" element={<About />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
