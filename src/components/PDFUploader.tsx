import React, { useState, useEffect, useCallback } from "react";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";
import { AlertCircle, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB in bytes

interface UploadedFile extends File {
  preview?: string;
}

interface FileMetadata {
  name: string;
  size: number;
  type: string;
}

interface PDFUploaderProps {
  onFileUpload: (files: File[]) => void;
  value?: File[];
}

const PDFUploader: React.FC<PDFUploaderProps> = ({
  onFileUpload,
  value = [],
}) => {
  const [files, setFiles] = useState<UploadedFile[]>(value);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedMetadata = localStorage.getItem("fileMetadata");
    if (storedMetadata) {
      const parsedMetadata: FileMetadata[] = JSON.parse(storedMetadata);
      setFiles((prevFiles) => {
        // Retrieve files from URLs or other sources if needed
        return parsedMetadata.map((metadata) => {
          return {
            name: metadata.name,
            size: metadata.size,
            type: metadata.type,
            // file content needs to be retrieved separately
          } as UploadedFile;
        });
      });
    }
  }, []);

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
        // Store file metadata in localStorage
        const fileMetadata = validFiles.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
        }));
        localStorage.setItem("fileMetadata", JSON.stringify(fileMetadata));

        setFiles((prevFiles) => [...prevFiles, ...validFiles]);
        onFileUpload([...files, ...validFiles]);
      }
    },
    [files, onFileUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: MAX_FILE_SIZE,
    onDrop: (acceptedFiles) => handleFiles(acceptedFiles),
    onDropRejected: (fileRejections: FileRejection[]) => {
      setError(fileRejections[0]?.errors[0]?.message || "File upload error");
    },
  } as DropzoneOptions);

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file !== fileToRemove);
      // Update localStorage
      const updatedMetadata = updatedFiles.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      localStorage.setItem("fileMetadata", JSON.stringify(updatedMetadata));
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
          <div
            key={file.name}
            className="flex items-center justify-between p-2 border rounded-md mb-2"
          >
            <span>{file.name}</span>
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleRemoveFile(file)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFUploader;
