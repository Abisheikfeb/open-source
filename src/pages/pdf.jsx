import React, { useEffect, useState } from "react";

const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch PDFs from the backend server
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-pdfs");
        if (!response.ok) {
          throw new Error("Failed to fetch PDFs");
        }
        const data = await response.json();
        setPdfs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  if (loading) {
    return <div>Loading PDFs...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>List of PDFs</h1>
      {pdfs.length === 0 ? (
        <p>No PDFs found.</p>
      ) : (
        <ul>
          {pdfs.map((pdf) => (
            <li key={pdf.public_id}>
              <a href={pdf.url} target="_blank" rel="noopener noreferrer">
                {pdf.public_id}.pdf
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PdfList;
