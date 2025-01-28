import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Stream = () => {
  const [pdfUrls, setPdfUrls] = useState([]); // Store multiple PDFs
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my-project"); // Replace with correct upload preset

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/ds0t3qsir/raw/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setPdfUrls((prevUrls) => [...prevUrls, data.secure_url]); // Store multiple URLs
        setError(null);
      } else {
        setError(`Upload failed: ${data.error?.message || "Unknown error"}`);
      }
    } catch (error) {
      setError("Error uploading PDF, please try again.");
      console.error("Error uploading PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input type="file" accept="application/pdf" onChange={handleUpload} />
      {loading && <p>Uploading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {pdfUrls.length > 0 && (
        <button
          onClick={() => navigate("/pdfs", { state: { pdfUrls } })}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          View All PDFs
        </button>
      )}
    </div>
  );
};

export default Stream;

