import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import { MdArrowBack } from "react-icons/md";
import { MdAddchart } from "react-icons/md";

const Stream = () => {
  const [pdfUrls, setPdfUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle PDF file upload
  const handleUpload = async (files) => {
    if (!files.length) return;

    // Filter only PDFs
    const pdfFiles = Array.from(files).filter(file => file.type === "application/pdf");
    if (pdfFiles.length === 0) {
      setError("Please upload only PDF files.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const uploadPromises = pdfFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my-project"); // Change this to your Cloudinary preset

        const response = await fetch("https://api.cloudinary.com/v1_1/ds0t3qsir/auto/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error?.message || "Upload failed");
        }
        return data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setPdfUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);
    } catch (error) {
      setError(error.message || "Error uploading PDFs, please try again.");
      console.error("Upload Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle file input change
  const handleFileChange = (event) => {
    setError(null); // Clear previous errors
    handleUpload(event.target.files);
  };

  // Handle drag & drop file upload
  const handleDrop = (event) => {
    event.preventDefault();
    handleUpload(event.dataTransfer.files);
  };

  return (
    <div>
       <button onClick={() => navigate("/home")} className="text-black flex items-start mt-2">
      <MdArrowBack className="text-2xl"/>
    </button>
    <div className="p-6 max-w-lg mx-auto">
     
      {/* Drop Zone / Clickable Upload Area */}
      <div
        className="border-4 border-dashed border-orange-600 rounded-lg p-8 md:px-20 mt-24
         text-center flex flex-col items-center justify-center animate-border cursor-pointer bg-pink-200 transition-all"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById("pdfInput").click()} 
      >
        <FiUploadCloud className="text-8xl text-blue-600 mb-2" />
        <p className="text-black text-lg font-mono">Click & Here Upload your PDFs</p>
        
        <input
          id="pdfInput"
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

     
      {loading && <p className="text-blue-500 mt-2" aria-live="polite">Uploading...</p>}
      {error && <p className="text-red-500 mt-2" aria-live="assertive">{error}</p>}

      
      {pdfUrls.length > 0 && (
        <button
          onClick={() => navigate("/pdf", { state: { pdfUrls } })}
          className="mt-4 p-2 bg-blue-500 text-white rounded w-full hover:bg-blue-600 transition"
        >
          View All PDFs
        </button>
      )}
    </div>
    <div>
     < MdAddchart className="flex items-end mt-10 text-red-600"  /> 
    </div>
    </div>
  );
};

export default Stream;
