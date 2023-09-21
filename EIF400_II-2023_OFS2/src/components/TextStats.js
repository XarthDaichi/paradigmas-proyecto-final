import React from 'react';

function TextStats({ filename, currentLine, totalLines, totalWords, isSaved }) {
  return (
    <div className="text-stats">
      <div className="file-info">
        <span className="filename">{filename}</span><br />
        <span className="saved-status">{isSaved ? 'Guardado' : 'No Guardado'}</span><br />
      </div>
      <div className="line-info">
        <span className="current-line">Línea: {currentLine}</span><br />
        <span className="total-lines">Total de Líneas: {totalLines}</span><br />
      </div>
      <div className="word-info">
        <span className="total-words">Total de Palabras: {totalWords}</span><br />
      </div>
    </div>
  );
}

export default TextStats;
