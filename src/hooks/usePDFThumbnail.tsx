import { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export function usePDFThumbnail(file: File | null) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      const generateThumbnail = async (fileUrl: string) => {
        try {
          const pdf = await pdfjsLib.getDocument(fileUrl).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 1 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const renderContext = {
            canvasContext: context!,
            viewport,
          };

          await page.render(renderContext).promise;

          const thumbnailUrl = canvas.toDataURL("image/png");
          setThumbnailUrl(thumbnailUrl);
        } catch (err) {
          console.error("Error generating thumbnail:", err);
          setError("Failed to generate thumbnail");
        } finally {
          URL.revokeObjectURL(fileUrl);
        }
      };

      generateThumbnail(fileUrl);
    }
  }, [file]);

  return { thumbnailUrl, error };
}
