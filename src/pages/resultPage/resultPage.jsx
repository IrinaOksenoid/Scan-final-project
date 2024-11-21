import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {Header, Footer} from '../../components/common'; 
import {ResultHeader, SummaryCarousel, DocumentList} from '../../components/ResultPage';
import { buildSearchParams } from '../../utils/searchParams';
import { fetchHistogramsAndPublications, fetchBatchDocuments } from '../../services/resultService';
import './resultPage.css';

function ResultPage() {
  const location = useLocation();
  const searchParams = location.state?.searchParams;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [histograms, setHistograms] = useState([]);
  const [documentIds, setDocumentIds] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchParams) {
        setError('Параметры поиска не переданы');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const params = buildSearchParams(searchParams);

        // Загружаем сводку и ID публикаций
        const { histograms, ids } = await fetchHistogramsAndPublications(params);
        setHistograms(histograms);
        setDocumentIds(ids);

        // Загружаем первые 10 публикаций
        const initialDocuments = await fetchBatchDocuments(ids, 0, 10);
        setDocuments(initialDocuments);
      } catch (err) {
        setError(err.message || 'Произошла ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  const handleLoadMore = async () => {
    const nextBatch = await fetchBatchDocuments(documentIds, documents.length, 10);
    setDocuments((prevDocs) => [...prevDocs, ...nextBatch]);
  };

  return (
    <div className="result-page">
      <Header />
      <div className="result-page__content">
        <ResultHeader />
        {loading ? (
          <div>Загрузка...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <SummaryCarousel histograms={histograms} />
            <DocumentList documents={documents} onLoadMore={handleLoadMore} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ResultPage;
