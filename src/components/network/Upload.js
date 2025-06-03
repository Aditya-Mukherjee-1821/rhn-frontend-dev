import React, { useRef, useEffect, useState } from "react";
import "./Upload.css";
import axios from "axios";
import * as XLSX from "xlsx";
import FadingTexts from "../misc/FadingTexts";

const Upload = ({setReFetchGraph, onClose, setShowModal }) => {
  const modalRef = useRef();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // 👈 NEW

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleApply = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true); // 👈 Start loading

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("✅ Upload successful:", response.data);
      alert("Excel file uploaded and saved on backend.");
      onClose();
      setReFetchGraph(new Date().toISOString());
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Upload failed. Check console.");
    } finally {
      setLoading(false); // 👈 Stop loading
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <h2>Upload Excel File</h2>
        <div className="input-area">
          {loading ? (
            <FadingTexts messages={["Updating network...", "Almost Done..."]}/> // 👈 Replace with spinner if you want
          ) : (
            <>
              <label className="file-upload-label">
                Choose Excel File
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  className="file-input"
                  disabled={loading} // 👈 Prevent selection during upload
                />
              </label>
              <span className="file-name">
                {file ? file.name : "No file selected"}
              </span>
            </>
          )}
        </div>

        <div className="modal-buttons">
          <button
            className="app-button"
            onClick={onClose}
            disabled={loading}
          >
            Close
          </button>
          <button
            className="app-button"
            onClick={handleApply}
            disabled={loading}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
