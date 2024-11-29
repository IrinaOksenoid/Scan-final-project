import React from 'react';
import './DocumentList.css';
import PublicationCard from './PublicationCard';

function DocumentList({ documents, onLoadMore }) {
  console.log('Received documents:', documents); // Логируем полученные документы
  
  if (!documents || documents.length === 0) {
    return <div className="document-list__empty">Документы не найдены.</div>;
  }
  return (
    <div className="document-list">
      <h2 className="document-list__title">Список документов</h2>
      <div className="document-list__container">
        {documents.map((doc, index) => (
          <PublicationCard
            key={doc.id || index} // Используем id или индекс
            date={doc.issueDate}
            source={doc.source.name}
            title={doc.title.text}
            content={doc.content}
            image={doc.imageUrl || 'https://via.placeholder.com/150'} // Пример заглушки
            wordCount={doc.attributes?.wordCount}
            url={doc.url}
            isTechNews={doc.attributes?.isTechNews}
            isAnnouncement={doc.attributes?.isAnnouncement}
            isDigest={doc.attributes?.isDigest}
          />
        ))}
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
