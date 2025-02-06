import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const WikiArticle = () => {
  const { pageid } = useParams();
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&format=json&origin=*&pageids=${pageid}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const page = data.query.pages[pageid];
        setTitle(page.title);
        setContent(page.extract);
      } catch (error) {
        console.error("Error fetching Wikipedia article:", error);
      }
    };

    fetchArticle();
  }, [pageid]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <button
        onClick={() => navigate("/WikiSearch")}
        className="mb-4 p-2 bg-gray-500 text-white rounded"
      >
        🔙 Back to Search
      </button>

      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {content ? <p className="whitespace-pre-line">{content}</p> : <p>Loading...</p>}
    </div>
  );
};

export default WikiArticle;
