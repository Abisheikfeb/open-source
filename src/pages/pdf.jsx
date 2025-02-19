import React, { useEffect, useState } from "react";

const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch PDFs from backend
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

  // Function to shorten file names
  const shortenFileName = (name, maxLength = 15) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + "...";
  };

  // Function to handle direct download
  const handleDownload = (pdf) => {
    // Append `fl_attachment` to force download
    const downloadUrl = pdf.url.replace("/upload/", "/upload/fl_attachment/");

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", `${pdf.public_id}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter PDFs based on search term
  const filteredPdfs = pdfs.filter((pdf) =>
    pdf.public_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading PDFs...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-4">List of PDFs</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search PDFs..."
        className="w-full p-2 mb-4 border text-black font-bold border-gray-300 rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredPdfs.length === 0 ? (
        <p className="text-center text-gray-500">No matching PDFs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredPdfs.map((pdf) => (
            <div
              key={pdf.public_id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col items-center text-center"
            >
              {/* File Name Below */}
              <h2 className="text-md font-semibold text-black w-full truncate mb-3">
                {shortenFileName(pdf.public_id)}.pdf
              </h2>

              {/* Buttons */}
              <div className="flex justify-between w-full mt-2">
                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  View
                </a>
                <button
                  onClick={() => handleDownload(pdf)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Download
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
