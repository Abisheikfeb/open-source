import React, { useState } from "react";

const Stream = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if the file is a PDF
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
        setPdfUrl(data.secure_url);
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
      {pdfUrl && (
        <div className="mt-4">
          <p>Uploaded PDF:</p>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            View PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default Stream;
