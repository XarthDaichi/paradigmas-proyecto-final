
import React, {useState, useEffect} from 'react';

import {API_SERVER_URL} from './Url';

const KeywordChecker = ({ text }) => {
  const [isKeyword, setIsKeyword] = useState(false);

  useEffect(() => {
    
    fetch(`${API_SERVER_URL}/word?key=${text}`)
      .then((response) => {console.log(response);return response.json();})
      .then((data) => setIsKeyword(data.isKeyword))
      .catch((error) => console.error('Error checking if text is a keyword:', error));
  }, [text]);
  return (
    <div>
      <p> {text} is a keyword: {isKeyword.toString()}</p>
    </div>
  );
};

export default KeywordChecker;
