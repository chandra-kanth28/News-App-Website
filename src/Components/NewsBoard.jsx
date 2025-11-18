import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_API_KEY;

    // IMPORTANT: must use HTTPS (you already did — good)
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Avoid crash: if API fails, set empty array
        setArticles(data?.articles || []);
      })
      .catch(() => setArticles([])); // Avoid breaking UI
  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>

      {articles.length > 0 ? (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))
      ) : (
        <p className="text-center mt-3 text-muted">No articles found...</p>
      )}
    </div>
  );
};

export default NewsBoard;
