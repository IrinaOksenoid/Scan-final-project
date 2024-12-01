import React from 'react';
import {parseAPIResponse} from '../../utils/parseAPIResponse';
import './PublicationCard.css';
import { formatDate } from '../../utils/formatDate ';

// Функция для обработки API-ответа
// function parseAPIResponse(markup) {
//   // 1. Декодируем экранированные символы
//   const decodedMarkup = he.decode(markup);

//   // 2. Парсим декодированный текст как XML/HTML
//   const parser = new DOMParser();
//   const xmlDoc = parser.parseFromString(decodedMarkup, "text/html");

//   // 3. Извлекаем текст без разметки
//   const sentences = Array.from(xmlDoc.getElementsByTagName("sentence"));
//   const textContent = sentences.map(sentence => sentence.textContent.trim()).join(" ");

//   // 4. Ищем тег <img> и извлекаем ссылку на изображение
//   const imgTag = xmlDoc.querySelector("img");
//   const imageUrl = imgTag ? imgTag.getAttribute("src") : null;

//   return { textContent, imageUrl };
// }

// Компонент PublicationCard
function PublicationCard({
  date,
  source,
  title,
  contentMarkup, // Передаем необработанный контент
  wordCount,
  url,
  isTechNews,
  isAnnouncement,
  isDigest,
}) {
  // Обрабатываем разметку
  // console.log ("Это contentMarkup, ", contentMarkup);
  const { textContent, imageUrl } = parseAPIResponse(contentMarkup);

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
        <span className="publication-card__date">{formatDate(date)}</span>
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
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="publication-card__image"
        />
      )}

      {/* Основной контент */}
      <p className="publication-card__content">{textContent}</p>

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


// import React, { useEffect, useState } from 'react';
// import './PublicationCard.css';
// import { formatDate } from '../../utils/formatDate ';
// import sanitizeHtml from ''; // Для очистки HTML

// function PublicationCard({
//   date,
//   source,
//   title,
//   content,
//   wordCount,
//   url,
//   isTechNews,
//   isAnnouncement,
//   isDigest,
// }) {
//   const [parsedContent, setParsedContent] = useState('');
//   const [imageSrc, setImageSrc] = useState(null);

//   // Парсинг XML через DOMParser
//   useEffect(() => {
//     if (content.markup) {
//       try {
//         const parser = new DOMParser();
//         const xmlDoc = parser.parseFromString(content.markup, 'application/xml');

//         // Проверяем на ошибки парсинга
//         const parserError = xmlDoc.querySelector('parsererror');
//         if (parserError) {
//           console.error('Ошибка парсинга XML:', parserError.textContent);
//           setParsedContent('Не удалось загрузить контент');
//           return;
//         }

//         // Извлекаем предложения из <sentence>
//         const sentences = Array.from(xmlDoc.getElementsByTagName('sentence'))
//           .map((sentence) => sentence.textContent)
//           .join(' ');

//         // Очистка текста от лишних тегов и разметки
//         const sanitizedContent = sanitizeHtml(sentences, {
//           allowedTags: [], // Убираем все HTML-теги
//           allowedAttributes: {}, // Убираем атрибуты
//         });
//         setParsedContent(sanitizedContent);

//         // Извлекаем URL изображения из <img>
//         const imgTag = xmlDoc.querySelector('img');
//         if (imgTag) {
//           const src = imgTag.getAttribute('src');
//           setImageSrc(src);
//         }
//       } catch (error) {
//         console.error('Ошибка обработки XML:', error);
//         setParsedContent('Не удалось загрузить контент');
//       }
//     }
//   }, [content]);

//   // Определяем тег публикации
//   const getTag = () => {
//     if (isTechNews) return 'Технические новости';
//     if (isAnnouncement) return 'Анонсы и события';
//     if (isDigest) return 'Сводки новостей';
//     return null;
//   };

//   return (
//     <div className="publication-card">
//       {/* Дата и источник */}
//       <div className="publication-card__header">
//         <span className="publication-card__date">{formatDate(date)}</span>
//         <a
//           href={source}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="publication-card__source"
//         >
//           {source}
//         </a>
//       </div>

//       {/* Заголовок */}
//       <h3 className="publication-card__title">{title}</h3>

//       {/* Тег публикации */}
//       {getTag() && <span className="publication-card__tag">{getTag()}</span>}

//       {/* Изображение */}
//       {imageSrc && (
//         <img
//           src={imageSrc}
//           alt={title}
//           className="publication-card__image"
//         />
//       )}

//       {/* Основной контент */}
//       <p className="publication-card__content">{parsedContent}</p>

//       {/* Кнопка и количество слов */}
//       <div className="publication-card__footer">
//         <a
//           href={url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="publication-card__button"
//         >
//           Читать в источнике
//         </a>
//         <span className="publication-card__word-count">{wordCount} слова</span>
//       </div>
//     </div>
//   );
// }

// export default PublicationCard;
