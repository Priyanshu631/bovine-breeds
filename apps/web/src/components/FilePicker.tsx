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
        border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors duration-200
        ${isDragging ? 'border-primary bg-primary/10' : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        accept="image/*"
      />
      <div className="flex flex-col items-center gap-2 text-gray-500">
        <UploadCloud className="w-10 h-10" />
        <p className="font-semibold">Drag & drop an image here</p>
        <p className="text-sm">or click to select a file</p>
      </div>
    </div>
  );
};
