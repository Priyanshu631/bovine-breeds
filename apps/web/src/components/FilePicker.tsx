"use client";

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud } from 'lucide-react';

interface FilePickerProps {
  onFileChange: (file: File) => void;
}

export const FilePicker = ({ onFileChange }: FilePickerProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileChange(files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileChange(files[0]);
    }
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onClick={openFileDialog}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={`
        border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200
        ${isDragging 
          ? 'border-amber-700 bg-amber-100/50' 
          : 'border-amber-300 bg-amber-50 hover:border-amber-400 hover:bg-amber-100/60'
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        accept="image/*"
      />
      <div className="flex flex-col items-center gap-3 text-amber-800">
        <UploadCloud className="w-12 h-12 text-amber-700" />
        <p className="font-semibold text-amber-900">Drag & drop an image here</p>
        <p className="text-sm text-amber-800/80">or click to select a file</p>
      </div>
    </div>
  );
};
