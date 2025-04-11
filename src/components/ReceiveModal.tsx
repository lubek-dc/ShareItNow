import React, { useState } from 'react';
import { X, Download, Smartphone, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { useFiles } from '../contexts/FileContext';

const ReceiveModal: React.FC = () => {
  const { setIsReceiveModalOpen, receiveFileWithCode } = useFiles();
  
  const [code, setCode] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  
  const handleClose = () => {
    setIsReceiveModalOpen(false);
  };
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }
    
    setIsProcessing(true);
    setStatus('processing');
    setError(null);
    
    try {
      const success = await receiveFileWithCode(code);
      
      if (success) {
        setStatus('success');
      } else {
        setStatus('error');
        setError('Invalid code or connection issue. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const renderCodeInput = () => (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Enter 6-digit code</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
            Sharing Code
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={handleCodeChange}
            placeholder="Enter 6-digit code"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            maxLength={6}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={code.length !== 6 || isProcessing}
          className={`w-full py-2 px-4 rounded-md font-medium ${
            code.length === 6 && !isProcessing
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Receive Files
        </button>
      </form>
      
      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-3">Other receive methods:</p>
        <button className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50">
          <Smartphone className="h-5 w-5 text-gray-500" />
          <span>Receive via NFC</span>
        </button>
      </div>
    </div>
  );
  
  const renderProcessing = () => (
    <div className="p-6 text-center">
      <Loader className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-spin" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Receiving files</h3>
      <p className="text-gray-500 mb-4">
        Connecting and downloading files...
      </p>
      
      <div className="bg-gray-100 rounded-full h-2 mb-4">
        <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
      </div>
      
      <p className="text-sm text-gray-500">Please keep the app open during transfer</p>
    </div>
  );
  
  const renderSuccess = () => (
    <div className="p-6 text-center">
      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Files received successfully!</h3>
      <p className="text-gray-500 mb-6">
        All files have been downloaded and are ready to use.
      </p>
      
      <button
        onClick={handleClose}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        View Files
      </button>
    </div>
  );
  
  const renderError = () => (
    <div className="p-6 text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Transfer failed</h3>
      <p className="text-gray-500 mb-6">
        {error || 'There was an error receiving the files. Please try again.'}
      </p>
      
      <button
        onClick={() => setStatus('idle')}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-medium">Receive Files</h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {status === 'idle' && renderCodeInput()}
        {status === 'processing' && renderProcessing()}
        {status === 'success' && renderSuccess()}
        {status === 'error' && renderError()}
      </div>
    </div>
  );
};

export default ReceiveModal;
