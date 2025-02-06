import { useState } from "react";
import { jsPDF } from "jspdf";

const PdfDownloader = () => {
  const [userLink, setUserLink] = useState("");

  const downloadPdf = () => {
    if (!userLink.trim()) {
      alert("Please enter a valid link");
      return;
    }

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text("Downloaded Link", 10, 10);

    // Add user link as a clickable hyperlink
    doc.setFontSize(12);
    doc.textWithLink(userLink, 10, 20, { url: userLink });

   
    doc.save("user_link.pdf");
  };

  return (
    <div className="p-4 flex flex-col items-center gap-3">
      <input
        type="text"
        placeholder="Enter link"
        value={userLink}
        onChange={(e) => setUserLink(e.target.value)}
        className="border p-2 w-80"
      />
      <button
        onClick={downloadPdf}
        className="bg-blue-500 text-white  px-4 py-2 rounded"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default PdfDownloader;
