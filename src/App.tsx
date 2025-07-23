import React from 'react';
import { Upload, FileText, Database, File, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import FileUploadSection from './components/FileUploadSection';
import Hero from './components/Hero';
import Features from './components/Features';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Hero />
      <Features />
      <FileUploadSection />
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-400">
            © 2025 File Processing Platform. Powered by n8n workflow automation.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;