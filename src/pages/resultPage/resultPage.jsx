import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Footer } from '../../components/common';
import { ResultHeader, SummaryCarousel, DocumentList } from '../../components/ResultPage';
import { buildSearchParams } from '../../utils/searchParams';
import { fetchHistogramsAndPublications, fetchBatchDocuments } from '../../services/resultService';
import { Loader } from '../../components/common';
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
        const params = buildSearchParams(searchParams); // Формируем параметры для API
        console.log('Request Parameters:', params);

        // Загружаем сводку и ID публикаций
        const { histograms: fetchedHistograms, ids: fetchedIds } = await fetchHistogramsAndPublications(params);

        setHistograms(fetchedHistograms);
        setDocumentIds(fetchedIds);
        //console.log('Fetched Histograms:', fetchedHistograms);
        // console.log('Fetched Publication IDs:', fetchedIds);

        // Загружаем первые 10 публикаций
        const initialDocuments = await fetchBatchDocuments(fetchedIds, 0, 10);
        //console.log('Fetched Initial Documents:', initialDocuments);
        setDocuments(initialDocuments);
      } catch (err) {
        console.error('Error fetching results:', err);
        setError('Произошла ошибка при загрузке данных.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  const handleLoadMore = async () => {
    try {
      const nextBatch = await fetchBatchDocuments(documentIds, documents.length, 10);
      setDocuments((prevDocs) => [...prevDocs, ...nextBatch]);
    } catch (error) {
      console.error('Error loading more documents:', error);
      setError('Произошла ошибка при загрузке дополнительных документов.');
    }
  };

  return (
    <div className="result-page">
      <Header />
      <div className="result-page__content">
        <ResultHeader />
        {loading ? (
          <div className="loader-wrapper">
            <Loader />
          </div>
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
