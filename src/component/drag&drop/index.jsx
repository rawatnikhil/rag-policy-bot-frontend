import React, { useState } from "react";
import "./style.css";
import { ingestAPi } from "../../api";

export default function DragDropPDF() {
    const [file, setFile] = useState(null);

    const handleFile = pdf => {
        if (!pdf) return;
        if (pdf.type !== "application/pdf") {
            alert("Only PDF files allowed");
            return;
        }
        setFile(pdf);
    };

    const handleDrop = e => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        handleFile(droppedFile);
    };

    const handleRemove = () => {
        setFile(null);
    };

    const handleUpload = async () => {
        if (!file) return alert("Select a file first");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const json = await ingestAPi(formData);
            console.log("Server response:", json);
            setFile(null);
            alert(json.file + " " + json.message);
        } catch (err) {
            console.error(err);
            alert("Upload failed!");
        }
    };

    return (
        <div className="drag-container" onDragOver={e => e.preventDefault()} onDrop={handleDrop}>
            {!file ? (
                <>
                    <p className="icon">📄</p>
                    <p className="title">Upload PDF</p>
                    <p className="subtitle">Drag & drop or click to upload</p>

                    <input
                        type="file"
                        accept="application/pdf"
                        className="file-input"
                        onChange={e => handleFile(e.target.files[0])}
                    />
                </>
            ) : (
                <div className="file-display">
                    <p>📘 {file.name}</p>

                    <button className="remove-btn" onClick={handleRemove}>
                        Remove
                    </button>

                    <button className="upload-btn" onClick={handleUpload}>
                        Upload
                    </button>
                </div>
            )}
        </div>
    );
}
