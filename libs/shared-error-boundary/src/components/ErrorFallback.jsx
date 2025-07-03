import React, { useState } from 'react';
import {
  AlertTriangle,
  RefreshCw,
  Home,
  Mail,
  Copy,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export function ErrorFallback({
  error,
  errorInfo,
  errorId,
  onReset,
  onRetry,
  showDetails = false,
  customMessage,
  theme = 'default',
  showErrorId = true,
  showContactSupport = true,
}) {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(showDetails);

  const copyErrorDetails = () => {
    const errorText = `
Error ID: ${errorId}
Error: ${error?.message}
Stack: ${error?.stack}
Component Stack: ${errorInfo?.componentStack}
URL: ${window.location.href}
Timestamp: ${new Date().toISOString()}
    `.trim();

    navigator.clipboard.writeText(errorText).then(() => {
      // You could show a toast notification here
      console.log('Error details copied to clipboard');
    });
  };

  const contactSupport = () => {
    const subject = encodeURIComponent(`Error Report - ${errorId}`);
    const body = encodeURIComponent(`
Hello Support Team,

I encountered an error while using the application.

Error ID: ${errorId}
Error: ${error?.message}
URL: ${window.location.href}

Please help me resolve this issue.

Thank you.
    `);

    window.open(`mailto:support@brizpickr.com?subject=${subject}&body=${body}`);
  };

  const themes = {
    default: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-900',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondaryButton: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    },
    dark: {
      bg: 'bg-gray-900',
      border: 'border-gray-700',
      text: 'text-gray-100',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondaryButton: 'bg-gray-700 hover:bg-gray-600 text-gray-100',
    },
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-900',
      button: 'bg-red-600 hover:bg-red-700 text-white',
      secondaryButton: 'bg-red-100 hover:bg-red-200 text-red-800',
    },
  };

  const currentTheme = themes[theme] || themes.default;

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${currentTheme.bg}`}
    >
      <div
        className={`max-w-md w-full ${currentTheme.border} border rounded-lg shadow-lg p-6 ${currentTheme.bg}`}
      >
        {/* Error Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {/* Error Message */}
        <div className="text-center mb-6">
          <h1 className={`text-2xl font-bold mb-2 ${currentTheme.text}`}>
            Oops! Something went wrong
          </h1>
          <p className={`text-sm ${currentTheme.text} opacity-75`}>
            {customMessage ||
              "We're sorry, but something unexpected happened. Our team has been notified."}
          </p>

          {showErrorId && errorId && (
            <p className={`text-xs mt-2 ${currentTheme.text} opacity-50`}>
              Error ID: {errorId}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className={`w-full flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors ${currentTheme.button}`}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          )}

          <button
            onClick={() => (window.location.href = '/')}
            className={`w-full flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors ${currentTheme.secondaryButton}`}
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Home
          </button>

          {showContactSupport && (
            <button
              onClick={contactSupport}
              className={`w-full flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors ${currentTheme.secondaryButton}`}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </button>
          )}
        </div>

        {/* Error Details (Collapsible) */}
        {error && (
          <div className="mt-6">
            <button
              onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentTheme.secondaryButton}`}
            >
              <span>Error Details</span>
              {isDetailsExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {isDetailsExpanded && (
              <div className="mt-3 p-3 bg-gray-100 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium text-gray-600">
                    Error Message:
                  </span>
                  <button
                    onClick={copyErrorDetails}
                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </button>
                </div>
                <pre className="text-xs text-gray-700 whitespace-pre-wrap break-words">
                  {error.message}
                </pre>

                {error.stack && (
                  <div className="mt-3">
                    <span className="text-xs font-medium text-gray-600">
                      Stack Trace:
                    </span>
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap break-words mt-1">
                      {error.stack}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
