import React, { useEffect, useState } from 'react';
import './SummaryCarousel.css';
import { Loader } from '../common';
import { formatDate } from '../../utils/formatDate ';
import MobileSummaryCarousel from './MobileSummaryCarousel';
import arrowIcon from '../../assets/icon_arrow.svg';

function SummaryCarousel({ histograms, loading, error }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 420);
  const [currentIndex, setCurrentIndex] = useState(0); 

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 420);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="summary-carousel__error">{error}</div>;
  }

  if (isMobile) {
    return <MobileSummaryCarousel histograms={histograms} />;
  }

 // const totalDocuments = histograms.find((item) => item.histogramType === 'totalDocuments')?.data || [];
 // const riskFactors = histograms.find((item) => item.histogramType === 'riskFactors')?.data || [];

//   return (
//     <div className="summary-carousel">
//       <h2 className="summary-carousel__title">Общая сводка</h2>
//       <p className="summary-carousel__subtitle">Найдено {totalDocuments.reduce((sum, item) => sum + item.value, 0)} вариантов</p>

//       <div className="summary-carousel__slider">
//         <button className="slider__arrow slider__arrow--left" onClick={() => {}}>
//           &#8592;
//         </button>
//         <div className="summary-carousel__container">
//           {totalDocuments.map((item, index) => (
//             <div key={index} className="summary-carousel__item">
//               <div className="summary-carousel__date">{formatDate(item.date)}</div>
//               <div className="summary-carousel__value">{item.value}</div>
//               <div className="summary-carousel__risk">{riskFactors[index]?.value || 0}</div>
//             </div>
//           ))}
//         </div>
//         <button className="slider__arrow slider__arrow--right" onClick={() => {}}>
//           &#8594;
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SummaryCarousel;



// import React, { useState } from 'react';
// import './SummaryCarousel.css';
// import { Loader } from '../common';
// import { formatDate } from '../../utils/formatDate ';
// import arrowIcon from '../../assets/icon_arrow.svg';

// function SummaryCarousel({ histograms, loading, error }) {
//   const [currentIndex, setCurrentIndex] = useState(0); // Текущая позиция карусели

//   if (loading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <div className="summary-carousel__error">{error}</div>;
//   }

const totalDocuments = histograms.find((item) => item.histogramType === 'totalDocuments')?.data || [];
const riskFactors = histograms.find((item) => item.histogramType === 'riskFactors')?.data || [];

  const itemsPerPage = 5; // Количество элементов, отображаемых одновременно
  const totalPages = Math.ceil(totalDocuments.length / itemsPerPage);

  // Обработчики кнопок
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalPages - 1));
  };

  // Вычисляем текущие элементы для отображения
  const currentItems = totalDocuments.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  const currentRiskItems = riskFactors.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <div className="summary-carousel">
      <h2 className="summary-carousel__title">Общая сводка</h2>
      <p className="summary-carousel__subtitle">Найдено {totalDocuments.reduce((sum, item) => sum + item.value, 0)} вариантов</p>

      <div className="summary-carousel__content">
        {/* Стрелка "Назад" */}
        <button
          className="slider__arrow slider__arrow--left"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <img src={arrowIcon} alt="Previous" style={{ transform: 'rotate(180deg)' }} />
        </button>

        {/* Блок заголовков */}
        <div className="summary-carousel__header">
        <div className="summary-carousel__header-item">Период</div>
          <div className="summary-carousel__header-item">Всего</div>
          <div className="summary-carousel__header-item">Риски</div>
        </div>

        {/* Карусель */}
        <div className="summary-carousel__slider">
          {currentItems.map((item, index) => (
            <div key={index} className="summary-carousel__item">
              <div className="summary-carousel__date">{formatDate(item.date)}</div>

              <div className="summary-carousel__value">{item.value}</div>
              <div className="summary-carousel__value">
                {currentRiskItems[index] ? currentRiskItems[index].value : 0}
              </div>
            </div>
          ))}
        </div>

        {/* Стрелка "Вперёд" */}
        <button
          className="slider__arrow slider__arrow--right"
          onClick={handleNext}
          disabled={currentIndex === totalPages - 1}
        >
          <img src={arrowIcon} alt="Next" />
        </button>
      </div>
    </div>
  );
}

export default SummaryCarousel;
