import React, { useState } from "react";

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    onFileUpload(uploadedFile);
  };

  return (
    <div className="file-upload">
      <label>📎 Attach File: </label>
      <input type="file" onChange={handleFileChange} />
      {file && <p>📂 {file.name}</p>}
    </div>
  );
};

export default FileUpload;
