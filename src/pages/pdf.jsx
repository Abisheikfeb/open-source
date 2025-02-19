import React, { useEffect, useState } from "react";
import { FaSearch, FaFilePdf, FaEye, FaDownload } from "react-icons/fa";

const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-pdfs");
        if (!response.ok) throw new Error("Failed to fetch PDFs");

        const data = await response.json();
        setPdfs(data);
        setFilteredPdfs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  const extractFileName = (fullPath) => fullPath.split("/").pop();

  const searchPdfs = (query) => {
    setSearchTerm(query);
    if (!query) {
      setFilteredPdfs(pdfs);
      return;
    }

    // Simple Linear Search
    const filtered = pdfs.filter((pdf) =>
      extractFileName(pdf.public_id).toLowerCase().includes(query.toLowerCase())
    );

    setFilteredPdfs(filtered);
  };

  const handleDownload = (pdf) => {
    const downloadUrl = pdf.url.replace("/upload/", "/upload/fl_attachment/");
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", extractFileName(pdf.public_id));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="text-center text-lg font-semibold">Loading PDFs...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">📂 List of PDFs</h1>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search PDFs..."
          className="w-full p-3 pl-10 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => searchPdfs(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-3 text-gray-500 text-lg" />
      </div>

      {filteredPdfs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No matching PDFs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPdfs.map((pdf) => (
            <div
              key={pdf.public_id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 flex flex-col items-center text-center transition-transform transform hover:scale-105"
            >
              <FaFilePdf className="text-red-500 text-4xl mb-3" />
              <h2 className="text-lg font-semibold text-black w-full truncate mb-3">
                {extractFileName(pdf.public_id)}
              </h2>

              <div className="flex gap-4 mt-3">
                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 flex items-center gap-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <FaEye /> View
                </a>
                <button
                  onClick={() => handleDownload(pdf)}
                  className="bg-green-500 text-white px-4 py-2 flex items-center gap-2 rounded-lg hover:bg-green-600 transition"
                >
                  <FaDownload /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PdfList;



