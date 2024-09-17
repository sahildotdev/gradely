import React, { useState, useCallback } from "react";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";
import { AlertCircle, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { usePDFThumbnail } from "@/hooks/usePDFThumbnail";
import Image from "next/image";

const MAX_FILE_SIZE = 25 * 1024 * 1024;

interface PDFUploaderProps {
  onFileUpload: (files: File[]) => void;
  value?: File[];
}

const PDFUploader: React.FC<PDFUploaderProps> = ({
  onFileUpload,
  value = [],
}) => {
  const [files, setFiles] = useState<File[]>(value);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    (newFiles: File[]) => {
      const validFiles = newFiles.filter((file) => {
        if (file.type !== "application/pdf") {
          setError("Only PDF files are allowed.");
          return false;
        }
        if (file.size > MAX_FILE_SIZE) {
          setError("File size exceeds 25 MB.");
          return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        setFiles((prevFiles) => {
          const updatedFiles = [...prevFiles, ...validFiles];
          onFileUpload(updatedFiles);
          return updatedFiles;
        });
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxSize: MAX_FILE_SIZE,
    onDrop: (acceptedFiles) => handleFiles(acceptedFiles),
    onDropRejected: (fileRejections: FileRejection[]) => {
      setError(fileRejections[0]?.errors[0]?.message || "File upload error");
    },
  } as DropzoneOptions);

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file !== fileToRemove);
      onFileUpload(updatedFiles);
      return updatedFiles;
    });
  };

  return (
    <div>
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 border-gray-300 p-10 rounded-3xl text-center cursor-pointer",
        })}
      >
        <input {...getInputProps()} />
        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-500" />
        <p className="text-gray-600">
          Drag and drop your PDF file here, or click to select one.
        </p>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
      <div className="mt-4">
        {files.map((file) => (
          <FileItem key={file.name} file={file} onRemove={handleRemoveFile} />
        ))}
      </div>
    </div>
  );
};

const FileItem: React.FC<{ file: File; onRemove: (file: File) => void }> = ({
  file,
  onRemove,
}) => {
  const { thumbnailUrl, error } = usePDFThumbnail(file);

  return (
    <div className="flex items-center justify-between p-2 border rounded-md mb-2">
      <div className="flex items-center space-x-4">
        {!error && !thumbnailUrl && (
          <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
            <span>Thumbnail Loading...</span>
          </div>
        )}
        {/*{thumbnailUrl && (
          <Image
            width={120}
            height={160}
            src={thumbnailUrl}
            alt="PDF Thumbnail"
            className="w-16 h-16 object-cover"
          />
        )}*/}
        <span>{file.name}</span>
      </div>
      <Button
        type="button"
        variant="destructive"
        onClick={() => onRemove(file)}
      >
        Remove
      </Button>
    </div>
  );
};

export default PDFUploader;
