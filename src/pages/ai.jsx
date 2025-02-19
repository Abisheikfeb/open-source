import { useState } from "react";
import axios from "axios";

export default function Ai() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(""); // Reset error on new file selection
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/upload-pdf/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Backend response:", response.data);
      if (response.data.error) {
        setError(response.data.error);
      } else {
        setSummary(response.data.summary);
      }
    } catch (error) {
      console.error("Upload error:", error.response ? error.response.data : error);
      setError("Failed to upload and process the PDF.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">PDF Summarizer AI</h1>
      
      <input type="file" onChange={handleFileChange} accept="application/pdf" className="mb-4"/>
      
      <button 
        onClick={handleUpload} 
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" 
        disabled={loading}
      >
        {loading ? "Processing..." : "Upload & Summarize"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {summary && (
        <div className="mt-6 p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
