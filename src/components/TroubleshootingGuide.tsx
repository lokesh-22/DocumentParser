import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

const TroubleshootingGuide: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const troubleshootingSteps = [
    {
      title: "1. Check if n8n is running",
      description: "Open your browser and go to http://localhost:5678",
      expected: "You should see the n8n interface",
      solution: "If not working, start n8n with: npm install n8n -g && n8n"
    },
    {
      title: "2. Create the webhook in n8n",
      description: "Create a new workflow with a Webhook node",
      expected: "Set the webhook path to 'webhook-test/upload' and method to 'POST'",
      solution: "The webhook URL should be: http://localhost:5678/webhook-test/upload"
    },
    {
      title: "3. Configure CORS in n8n",
      description: "n8n needs to allow cross-origin requests",
      expected: "Restart n8n with CORS enabled",
      solution: "Run: n8n start --cors-origin=\"*\" or set N8N_CORS_ORIGIN=*"
    },
    {
      title: "4. Test the webhook directly",
      description: "Test if the webhook responds to requests",
      expected: "The webhook should accept POST requests",
      solution: "Use curl or Postman to test: curl -X POST http://localhost:5678/webhook-test/upload"
    }
  ];

  return (
    <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-amber-100 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <h3 className="text-lg font-semibold text-amber-900">
            Troubleshooting Connection Issues
          </h3>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-amber-600" />
        ) : (
          <ChevronRight className="h-5 w-5 text-amber-600" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6">
          <p className="text-amber-800">
            If you're seeing connection errors, follow these steps to set up n8n properly:
          </p>
          
          {troubleshootingSteps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-amber-200">
              <h4 className="font-semibold text-slate-900 mb-2">{step.title}</h4>
              <p className="text-slate-700 mb-2">{step.description}</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-800">{step.expected}</p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800 font-mono">{step.solution}</p>
              </div>
            </div>
          ))}
          
          <div className="bg-slate-100 rounded-xl p-4">
            <h4 className="font-semibold text-slate-900 mb-2">Quick Test</h4>
            <p className="text-slate-700 mb-3">
              Once n8n is running with CORS enabled, test your webhook:
            </p>
            <a
              href="http://localhost:5678/webhook-test/upload"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              Open webhook URL
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default TroubleshootingGuide;