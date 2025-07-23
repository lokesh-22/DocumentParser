import React, { useState } from 'react';
import FileUploader from './FileUploader';
import UploadStatus from './UploadStatus';
import TroubleshootingGuide from './TroubleshootingGuide';

export interface UploadStatus {
  status: 'idle' | 'uploading' | 'success' | 'error';
  message: string;
  progress: number;
}

const FileUploadSection: React.FC = () => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    status: 'idle',
    message: '',
    progress: 0
  });

  const handleUpload = async (files: File[]) => {
    setUploadStatus({ status: 'uploading', message: 'Preparing upload...', progress: 0 });

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('fileType', file.type);
        formData.append('fileSize', file.size.toString());

        setUploadStatus({ 
          status: 'uploading', 
          message: `Uploading ${file.name}...`, 
          progress: (i / files.length) * 50 
        });

        // Try to upload to n8n webhook
        let response;
        try {
          // Try the webhook URL
          const webhookUrl = 'http://localhost:5678/webhook-test/upload';
          
          response = await fetch(webhookUrl, {
            method: 'POST',
            body: formData,
            headers: {
              // Don't set Content-Type for FormData - browser sets it automatically with boundary
            }
          });
        } catch (networkError) {
          // Handle network/CORS errors
          if (networkError instanceof TypeError && networkError.message.includes('fetch')) {
            throw new Error('Cannot connect to n8n webhook. Please ensure:\n\n1. n8n is running on localhost:5678\n2. The webhook endpoint "/webhook-test/upload" exists\n3. CORS is properly configured in n8n\n\nTo fix CORS, restart n8n with:\nn8n start --cors-origin="*"\n\nOr set environment variable:\nN8N_CORS_ORIGIN=*');
          }
          throw networkError;
        }

        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Unknown error');
          throw new Error(`Upload failed (${response.status}): ${response.statusText}\nResponse: ${errorText}`);
        }

        setUploadStatus({ 
          status: 'uploading', 
          message: `Processing ${file.name}...`, 
          progress: ((i + 0.5) / files.length) * 100 
        });

        // Try to parse response
        try {
          const result = await response.json();
          console.log('Upload result:', result);
        } catch (parseError) {
          // Response might not be JSON, that's okay
          console.log('Upload completed, response was not JSON');
        }

        // Wait a moment for processing
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setUploadStatus({ 
        status: 'success', 
        message: `Successfully uploaded and processed ${files.length} file${files.length > 1 ? 's' : ''}!`, 
        progress: 100 
      });

      // Reset status after 5 seconds
      setTimeout(() => {
        setUploadStatus({ status: 'idle', message: '', progress: 0 });
      }, 5000);

    } catch (error) {
      console.error('Upload error:', error);
      
      let errorMessage = 'Upload failed. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setUploadStatus({ 
        status: 'error', 
        message: errorMessage, 
        progress: 0 
      });

      // Reset status after 5 seconds
      setTimeout(() => {
        setUploadStatus({ status: 'idle', message: '', progress: 0 });
      }, 10000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-100 to-blue-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Upload Your Files
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Drag and drop your CSV, TXT, or PDF files below, or click to browse and select files
          </p>
        </div>

        <div className="space-y-8">
          <FileUploader onUpload={handleUpload} disabled={uploadStatus.status === 'uploading'} />
          {uploadStatus.status !== 'idle' && <UploadStatus {...uploadStatus} />}
          <TroubleshootingGuide />
        </div>
      </div>
    </section>
  );
};

export default FileUploadSection;