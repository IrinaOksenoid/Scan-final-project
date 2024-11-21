import React from 'react';
import './PublicationCard.css';

function PublicationCard({
  date,
  source,
  title,
  content,
  image,
  wordCount,
  url,
  isTechNews,
  isAnnouncement,
  isDigest,
}) {
  // Определяем тег для публикации
  const getTag = () => {
    if (isTechNews) return 'Технические новости';
    if (isAnnouncement) return 'Анонсы и события';
    if (isDigest) return 'Сводки новостей';
    return null;
  };

  return (
    <div className="publication-card">
      {/* Дата и источник */}
      <div className="publication-card__header">
        <span className="publication-card__date">{date}</span>
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="publication-card__source"
        >
          {source}
        </a>
      </div>

      {/* Заголовок */}
      <h3 className="publication-card__title">{title}</h3>

      {/* Тег публикации */}
      {getTag() && <span className="publication-card__tag">{getTag()}</span>}

      {/* Изображение */}
      {image && (
        <img
          src={image}
          alt={title}
          className="publication-card__image"
        />
      )}

      {/* Основной контент */}
      <p className="publication-card__content">{content}</p>

      {/* Кнопка и количество слов */}
      <div className="publication-card__footer">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="publication-card__button"
        >
          Читать в источнике
        </a>
        <span className="publication-card__word-count">{wordCount} слова</span>
      </div>
    </div>
  );
}

export default PublicationCard;
