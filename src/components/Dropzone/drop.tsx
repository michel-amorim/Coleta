import React, { useCallback, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDropzone } from "react-dropzone";

import "./style.css";

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);

      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div className="dropzone" {...getRootProps()} onChange={() => {}}>
      <input {...getInputProps()} accept="image/*" />
      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Imagem do Estabelecimento" />
      ) : (
        <p>
          <FiUpload />
          Imagem do Estabelecimento
        </p>
      )}
    </div>
  );
};

export default Dropzone;
