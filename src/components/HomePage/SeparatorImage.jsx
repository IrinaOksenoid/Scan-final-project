import React from 'react';
import homeImage from '../../assets/home/home_2.png'; // Путь к изображению
import './SeparatorImage.css'; // Стили

function SeparatorImage() {
  

  return (
    <section className="separator-section">
      <img src={homeImage} alt="Тематическая картинка" />
    </section>
  );
}

export default SeparatorImage;
