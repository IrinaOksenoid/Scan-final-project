import React from 'react';
import homeImage from '../../assets/home/home_2.png'; // Путь к изображению
import './SeparatorImage.css'; // Стили

function SeparatorImage() {
  

  return (
    <section className="separator-section">
       
      <div className="separator-section__image">
        <img src={homeImage} alt="Тематическая картинка" />
      </div>
    </section>
  );
}

export default SeparatorImage;
