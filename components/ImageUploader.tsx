
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  title: string;
  onImageUpload: (files: string[]) => void;
  id: string;
  multiple?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ title, onImageUpload, id, multiple = false }) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) {
      setImagePreviews([]);
      onImageUpload([]);
      return;
    }

    const fileArray = Array.from(files).filter(file => file.type.startsWith('image/'));

    const readerPromises = fileArray.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readerPromises)
      .then(base64Strings => {
        setImagePreviews(base64Strings);
        onImageUpload(base64Strings);
      })
      .catch(error => {
        console.error("Error reading files:", error);
        // Optionally handle the error in the UI
      });
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  }, [onImageUpload]);

  const renderPreviews = () => {
    if (imagePreviews.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400">
          <img src="https://img.icons8.com/color/96/upload--v1.png" alt="Upload" className="w-12 h-12 mb-3 drop-shadow-md" />
          <p className="mb-2 text-sm text-center">
            <span className="font-semibold">انقر للرفع</span> أو اسحب وأفلت
          </p>
          <p className="text-xs">PNG, JPG, WEBP</p>
        </div>
      );
    }

    if (imagePreviews.length === 1 && !multiple) {
      return <img src={imagePreviews[0]} alt="Preview" className="object-contain h-full w-full rounded-lg" />;
    }

    // Multiple images view
    return (
      <div className="p-4 h-full w-full">
        <div className="grid grid-cols-3 gap-2 overflow-y-auto h-full max-h-56">
          {imagePreviews.map((src, index) => (
            <div key={index} className="relative aspect-square">
              <img src={src} alt={`Preview ${index + 1}`} className="object-cover h-full w-full rounded-md" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <label
      htmlFor={id}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className="block w-full cursor-pointer"
    >
      <h3 className="text-lg font-semibold text-gray-200 mb-2 text-center">{title}</h3>
      <div
        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg transition-colors duration-200
        ${isDragging ? 'border-indigo-400 bg-gray-700' : 'border-gray-600 bg-gray-800 hover:bg-gray-700'}`}
      >
        {renderPreviews()}
        <input id={id} type="file" className="hidden" accept="image/*" multiple={multiple} onChange={(e) => handleFiles(e.target.files)} />
      </div>
    </label>
  );
};
