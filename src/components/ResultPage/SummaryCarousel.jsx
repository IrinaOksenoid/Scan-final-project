import React from 'react';
import './SummaryCarousel.css';
import {Loader} from '../common'; // Для отображения лоадера

function SummaryCarousel() {
  return (
    <div className="summary-carousel">
      <Loader /> {/* На текущем этапе заглушка */}
    </div>
  );
}

export default SummaryCarousel;
