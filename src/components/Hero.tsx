import React from 'react';
import { Upload, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Zap className="h-4 w-4 text-yellow-300" />
            <span className="text-sm font-medium">Automated File Processing</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Transform Your Files
            <br />
            <span className="text-4xl md:text-6xl">Instantly</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Upload CSV, TXT, or PDF files and let our intelligent workflow process them automatically. 
            Fast, secure, and reliable file processing at your fingertips.
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>Drag & Drop</span>
            </div>
            <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <span>Multiple Formats</span>
            </div>
            <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <span>Instant Processing</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl"></div>
    </section>
  );
};

export default Hero;