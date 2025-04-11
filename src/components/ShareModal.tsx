import React, { useState, useEffect } from 'react';
import { X, Share2, Smartphone, Wifi, Cloud, Loader, CheckCircle } from 'lucide-react';
import { useFiles } from '../contexts/FileContext';
import { CompressionResult, TransferMethod } from '../types';
import { formatFileSize } from '../utils/mockData';

const ShareModal: React.FC = () => {
  const { 
    setIsShareModalOpen, 
    selectedFiles, 
    clearSelectedFiles,
    shareCode,
    compressAndShareFiles
  } = useFiles();
  
  const [step, setStep] = useState<'method' | 'processing' | 'ready'>(selectedFiles.length > 0 ? 'method' : 'ready');
  const [transferMethod, setTransferMethod] = useState<TransferMethod>('code');
  const [compressionResults, setCompressionResults] = useState<CompressionResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    if (selectedFiles.length === 0 && step !== 'ready') {
      setStep('ready');
    }
  }, [selectedFiles, step]);
  
  const handleClose = () => {
    setIsShareModalOpen(false);
    clearSelectedFiles();
  };
  
  const handleMethodSelect = (method: TransferMethod) => {
    setTransferMethod(method);
    setStep('processing');
    processFiles();
  };
  
  const processFiles = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const results = await compressAndShareFiles();
      if (results) {
        setCompressionResults(results);
      }
      
      setStep('ready');
    } catch (error) {
      console.error('Error processing files:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const getTotalStats = () => {
    if (compressionResults.length === 0) return null;
    
    const totalOriginal = compressionResults.reduce((sum, result) => sum + result.originalSize, 0);
    const totalCompressed = compressionResults.reduce((sum, result) => sum + result.compressedSize, 0);
    const totalSaved = totalOriginal - totalCompressed;
    const avgRatio = compressionResults.reduce((sum, result) => sum + result.compressionRatio, 0) / compressionResults.length;
    
    return {
      totalOriginal,
      totalCompressed,
      totalSaved,
      avgRatio
    };
  };
  
  const renderMethodSelection = () => (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Select sharing method</h3>
      
      <div className="grid grid-cols-1 gap-3">
        <button
          className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => handleMethodSelect('code')}
        >
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <Share2 className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">Share with code</h4>
            <p className="text-sm text-gray-500">Generate a 6-digit code valid for 10 minutes</p>
          </div>
        </button>
        
        <button
          className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => handleMethodSelect('nfc')}
        >
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
            <Smartphone className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">Share via NFC</h4>
            <p className="text-sm text-gray-500">Bring devices close together to transfer</p>
          </div>
        </button>
        
        <button
          className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => handleMethodSelect('cloud')}
        >
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
            <Cloud className="h-5 w-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">Upload to cloud</h4>
            <p className="text-sm text-gray-500">Store in your cloud account for later access</p>
          </div>
        </button>
      </div>
    </div>
  );
  
  const renderProcessing = () => (
    <div className="p-6 text-center">
      <Loader className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-spin" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Processing files</h3>
      <p className="text-gray-500 mb-4">
        QuickStream is analyzing and compressing your files for optimal transfer...
      </p>
      
      <div className="bg-gray-100 rounded-full h-2 mb-4">
        <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
      </div>
      
      <p className="text-sm text-gray-500">This may take a moment depending on file size and type</p>
    </div>
  );
  
  const renderReady = () => {
    const stats = getTotalStats();
    
    return (
      <div className="p-6">
        <div className="text-center mb-6">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
          <h3 className="text-lg font-medium text-gray-900">Files ready to share!</h3>
          
          {transferMethod === 'code' && shareCode && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Share this code with the recipient:</p>
              <div className="flex justify-center space-x-2 mb-2">
                {shareCode.split('').map((digit, index) => (
                  <div 
                    key={index}
                    className="w-10 h-12 bg-blue-50 border border-blue-200 rounded-md flex items-center justify-center text-xl font-bold text-blue-600"
                  >
                    {digit}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500">Code valid for 10 minutes</p>
            </div>
          )}
          
          {transferMethod === 'nfc' && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Bring devices close together</p>
              <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center">
                <Wifi className="h-10 w-10 text-blue-500" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Waiting for connection...</p>
            </div>
          )}
          
          {transferMethod === 'cloud' && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Files uploaded to cloud</p>
              <div className="w-20 h-20 mx-auto bg-purple-50 rounded-full flex items-center justify-center">
                <Cloud className="h-10 w-10 text-purple-500" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Available on all your devices</p>
            </div>
          )}
        </div>
        
        {stats && compressionResults.length > 0 && (
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h4 className="font-medium">QuickStream Compression Results</h4>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Original Size</p>
                  <p className="text-lg font-semibold">{formatFileSize(stats.totalOriginal)}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Compressed Size</p>
                  <p className="text-lg font-semibold">{formatFileSize(stats.totalCompressed)}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Space Saved</p>
                  <p className="text-lg font-semibold">{formatFileSize(stats.totalSaved)}</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Compression Ratio</p>
                  <p className="text-lg font-semibold">{stats.avgRatio.toFixed(1)}%</p>
                </div>
              </div>
              
              <div className="max-h-40 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ratio</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Algorithm</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {compressionResults.map((result, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{result.fileName}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-900">{result.compressionRatio.toFixed(1)}%</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-500">{result.algorithm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-medium">Share Files</h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="overflow-y-auto flex-grow">
          {step === 'method' && renderMethodSelection()}
          {step === 'processing' && renderProcessing()}
          {step === 'ready' && renderReady()}
        </div>
        
        <div className="border-t px-4 py-3 flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
