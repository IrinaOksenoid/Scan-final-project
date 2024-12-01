import React from 'react';
import './DocumentList.css';
import PublicationCard from './PublicationCard';

function DocumentList({ documents, onLoadMore }) {
 // console.log('Received documents:', documents);  Логируем полученные документы

  // Проверяем, что `documents` — это массив
  if (!Array.isArray(documents) || documents.length === 0) {
    return <div className="document-list__empty">Документы не найдены.</div>;
  }

  return (
    <div className="document-list">
      <h2 className="document-list__title">Список документов</h2>
      <div className="document-list__container">
        {documents.map((doc, index) => {
          // Обработка данных документа
          const date = doc.issueDate || 'Дата не указана';
          const source = doc.source?.name || 'Источник неизвестен';
          const title = doc.title?.text || 'Без заголовка';
          const contentMarkup = doc.content?.markup || ''; 
          const image = doc.content?.markup.includes('img src="')
            ? doc.content.markup.match(/img src="([^"]+)"/)?.[1]
            : null; // Извлекаем изображение из разметки
          const wordCount = doc.attributes?.wordCount || 0;
          const url = doc.url || '#';
          const isTechNews = doc.attributes?.isTechNews || false;
          const isAnnouncement = doc.attributes?.isAnnouncement || false;
          const isDigest = doc.attributes?.isDigest || false;

          return (
            <PublicationCard
              key={doc.id || index} // Используем id или индекс
              date={date}
              source={source}
              title={title}
              contentMarkup={contentMarkup} 
              image={image || 'https://via.placeholder.com/150'} // Заглушка, если изображение не найдено
              wordCount={wordCount}
              url={url}
              isTechNews={isTechNews}
              isAnnouncement={isAnnouncement}
              isDigest={isDigest}
            />
          );
        })}
      </div>

      {onLoadMore && (
        <button className="document-list__load-more" onClick={onLoadMore}>
          Показать больше
        </button>
      )}
    </div>
  );
}

export default DocumentList;
