import React, { useCallback, useState } from 'react';
import { Upload, FileText, Database, File, X } from 'lucide-react';

interface FileUploaderProps {
  onUpload: (files: File[]) => void;
  disabled?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload, disabled = false }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const acceptedTypes = ['.csv', '.txt', '.pdf'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const validateFile = (file: File): string | null => {
    const fileExtension = '.' + (file.name.split('.').pop()?.toLowerCase() || '');
    
    if (!acceptedTypes.includes(fileExtension)) {
      return `File type not supported. Please upload CSV, TXT, or PDF files only.`;
    }
    
    if (file.size > maxFileSize) {
      return `File size too large. Maximum size is 10MB.`;
    }
    
    if (file.size === 0) {
      return `File is empty.`;
    }
    
    return null;
  };

  const handleFiles = useCallback((files: FileList) => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      alert(`Some files were rejected:\n${errors.join('\n')}`);
    }

    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
    }
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles, disabled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;
    
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles);
      setSelectedFiles([]);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'csv': return Database;
      case 'txt': return FileText;
      case 'pdf': return File;
      default: return File;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      {/* Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".csv,.txt,.pdf"
          onChange={handleChange}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-4 rounded-full ${dragActive ? 'bg-blue-100' : 'bg-slate-100'} transition-colors duration-300`}>
            <Upload className={`h-8 w-8 ${dragActive ? 'text-blue-600' : 'text-slate-600'}`} />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {dragActive ? 'Drop files here' : 'Upload your files'}
            </h3>
            <p className="text-slate-600 mb-4">
              Drag and drop files here, or click to browse
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Database className="h-4 w-4" />
                CSV
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                TXT
              </span>
              <span className="flex items-center gap-1">
                <File className="h-4 w-4" />
                PDF
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Maximum file size: 10MB</p>
          </div>
        </div>
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-lg font-semibold text-slate-900">Selected Files</h4>
          {selectedFiles.map((file, index) => {
            const FileIcon = getFileIcon(file.name);
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-slate-100">
                    <FileIcon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{file.name}</p>
                    <p className="text-sm text-slate-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}
          
          <button
            onClick={handleUpload}
            disabled={disabled || selectedFiles.length === 0}
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {disabled ? 'Uploading...' : `Upload ${selectedFiles.length} File${selectedFiles.length > 1 ? 's' : ''}`}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;