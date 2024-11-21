import React from 'react';
import './DocumentList.css';

function DocumentList() {
  return (
    <div className="document-list">
      <h2 className="document-list__title">Список документов</h2>
      <div className="document-list__container">
        <div>
        <PublicationCard
            date="13.09.2021"
            source="Комсомольская правда KP.RU"
            title="Скиллфэктори - лучшая онлайн-школа для будущих айтишников"
            content="SkillFactory — школа для всех, кто хочет изменить свою карьеру и жизнь. С 2016 года обучение прошли 20 000+ человек из 40 стран и 4 континентов."
            image="https://via.placeholder.com/641x341"
            wordCount={2543}
            url="https://kp.ru"
            isTechNews={true}
            isAnnouncement={false}
            isDigest={false}
        />
        </div>
      </div>
      <button className="document-list__load-more">Показать больше</button>
    </div>
  );
}

export default DocumentList;
