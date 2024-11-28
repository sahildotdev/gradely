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
          console.log("Starting PDF processing...");
          const pdf = await pdfjsLib.getDocument(fileUrl).promise;
          console.log("PDF loaded:", pdf);

          const page = await pdf.getPage(1);
          console.log("Page loaded:", page);

          const viewport = page.getViewport({ scale: 0.5 });
          console.log("Viewport dimensions:", viewport.width, viewport.height);

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (!context) {
            throw new Error("Failed to get canvas context");
          }

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const renderContext = {
            canvasContext: context,
            viewport,
          };

          await page.render(renderContext).promise;
          console.log("Page rendered successfully on canvas.");

          const thumbnailUrl = canvas.toDataURL("image/png");
          setThumbnailUrl(thumbnailUrl);
          console.log("Thumbnail generated:", thumbnailUrl);
          console.log("Thumbnail URL length:", thumbnailUrl.length);
        } catch (err) {
          console.error("Error generating thumbnail:", err);
          setError("Failed to generate thumbnail");
        }
      };

      generateThumbnail(fileUrl);

      return () => {
        URL.revokeObjectURL(fileUrl);
      };
    }
  }, [file]);

  return { thumbnailUrl, error };
}
