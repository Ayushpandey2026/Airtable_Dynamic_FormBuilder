// src/components/FileUpload.jsx
import React, { useState } from "react";

/**
 Props:
  - onFiles(files) => void
  - multiple (bool)
*/
export default function FileUpload({ onFiles, multiple = false }) {
  const [previewNames, setPreviewNames] = useState([]);

  const handle = (e) => {
    const files = e.target.files;
    setPreviewNames(Array.from(files).map(f => f.name));
    if (onFiles) onFiles(files);
  };

  return (
    <div className="file-upload">
      <input type="file" multiple={multiple} onChange={handle} />
      {previewNames.length > 0 && (
        <div className="previews">
          {previewNames.map((n, i) => <div key={i}>{n}</div>)}
        </div>
      )}
    </div>
  );
}
