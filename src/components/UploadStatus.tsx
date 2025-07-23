import React from 'react';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface UploadStatusProps {
  status: 'uploading' | 'success' | 'error';
  message: string;
  progress: number;
}

const UploadStatus: React.FC<UploadStatusProps> = ({ status, message, progress }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
        return <Loader className="h-6 w-6 text-blue-600 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'uploading':
        return 'border-blue-200 bg-blue-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-slate-200 bg-slate-50';
    }
  };

  const getProgressBarColor = () => {
    switch (status) {
      case 'uploading':
        return 'bg-blue-600';
      case 'success':
        return 'bg-green-600';
      case 'error':
        return 'bg-red-600';
      default:
        return 'bg-slate-600';
    }
  };

  return (
    <div className={`p-6 rounded-2xl border-2 ${getStatusColor()} transition-all duration-300`}>
      <div className="flex items-center space-x-4 mb-4">
        {getStatusIcon()}
        <div className="flex-1">
          <p className="font-medium text-slate-900">{message}</p>
          {status === 'uploading' && (
            <p className="text-sm text-slate-600 mt-1">{Math.round(progress)}% complete</p>
          )}
        </div>
      </div>

      {status === 'uploading' && (
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full ${getProgressBarColor()} rounded-full transition-all duration-300 ease-out`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-4 p-4 bg-white rounded-xl border border-green-200">
          <p className="text-sm text-green-800">
            Your files have been successfully processed by the n8n workflow. 
            Check your n8n instance for the results.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 p-4 bg-white rounded-xl border border-red-200">
          <p className="text-sm text-red-800 whitespace-pre-line">
            {message.includes('Cannot connect') ? message : 
             'Please check that your n8n instance is running and the webhook URL is correct.\nIf the problem persists, try uploading smaller files or contact support.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadStatus;