
import React, {useState, useEffect} from 'react';

import {API_SERVER_URL} from '../api/Url';

const KeywordChecker = ({ text, evalRes }) => {
  const [isKeyword, setIsKeyword] = useState(false);

  useEffect(() => {
    
    fetch(`${API_SERVER_URL}/word?key=${text}`)
      .then((response) => {console.log(response);return response.json();})
      .then((data) => setIsKeyword(data.isKeyword))
      .catch((error) => console.error('Error checking if text is a keyword:', error));
  }, [text]);
  return (
    <div>
      <div className="console-box"> 
        <p>
          {/*{text} is a keyword: <span className={isKeyword ? 'keyword' : ''}>{isKeyword.toString()}</span><br></br>*/}
          <span>--------------------------------Evaluating Console-------------------------------</span><br></br>
          {evalRes}
        </p>
      </div>
    </div>
  );
};

export default KeywordChecker;
