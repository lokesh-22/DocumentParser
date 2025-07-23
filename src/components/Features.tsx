import React from 'react';
import { FileText, Database, File, Shield, Zap, CheckCircle } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: FileText,
      title: 'CSV Processing',
      description: 'Intelligent parsing and processing of CSV data with automatic column detection'
    },
    {
      icon: File,
      title: 'Text Analysis',
      description: 'Advanced text processing and analysis for TXT files with smart formatting'
    },
    {
      icon: Database,
      title: 'PDF Extraction',
      description: 'Extract and process content from PDF documents with precision'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant processing with real-time feedback and progress tracking'
    },
    {
      icon: Shield,
      title: 'Secure Upload',
      description: 'Enterprise-grade security with encrypted file transmission'
    },
    {
      icon: CheckCircle,
      title: 'Reliable Results',
      description: 'Consistent, accurate processing with detailed status reporting'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Powerful File Processing
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Our advanced workflow handles multiple file formats with intelligent processing capabilities
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;