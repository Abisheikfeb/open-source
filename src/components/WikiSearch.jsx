import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const WikiSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const searchWikipedia = async () => {
    if (!query.trim()) return;

    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${query}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.query.search);
    } catch (error) {
      console.error("Error fetching Wikipedia data:", error);
    }
  };

  return (
    <div>
        <button  onClick={() => navigate("/home")}>
        <MdArrowBack className="flex items-start text-black text-3xl"/>
        </button>
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Wikipedia Search</h2>
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full rounded text-black font-bold"
        placeholder="Search Wikipedia..."
        
      />
      <button
        onClick={searchWikipedia}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>

      <ul className="mt-4">
        {results.map((result) => (
          <li key={result.pageid} className="border-b p-2">
            <button
              onClick={() => navigate(`/article/${result.pageid}`)}
              className="text-blue-600 hover:underline"
            >
              {result.title}
            </button>
            <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default WikiSearch;

