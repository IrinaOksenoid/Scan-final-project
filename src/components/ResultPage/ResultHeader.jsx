import React from 'react';
import './ResultHeader.css';

function ResultHeader() {
  return (
    <div className="result-header">
      <h1 className="result-header__title">Ищем. Скоро будут результаты</h1>
      <p className="result-header__subtitle">
        Поиск может занять некоторое время, просим сохранить терпение.
      </p>
    </div>
  );
}

export default ResultHeader;
