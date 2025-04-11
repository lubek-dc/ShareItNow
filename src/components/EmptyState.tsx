import React from 'react';
import { Upload, Download } from 'lucide-react';
import { useFiles } from '../contexts/FileContext';

interface EmptyStateProps {
  type: 'device' | 'cloud';
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  const { setIsReceiveModalOpen } = useFiles();
  
  const handleReceiveClick = () => {
    setIsReceiveModalOpen(true);
  };
  
  return (
    <div className="text-center py-12 px-4">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {type === 'device' ? (
          <Smartphone className="h-8 w-8 text-blue-600" />
        ) : (
          <Cloud className="h-8 w-8 text-blue-600" />
        )}
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {type === 'device' ? 'No files on your device' : 'Your cloud storage is empty'}
      </h3>
      
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        {type === 'device' 
          ? 'Receive files from other devices or upload files from your device to get started.'
          : 'Upload files to your cloud storage to access them from any device.'}
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
        <button
          onClick={handleReceiveClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Receive Files</span>
        </button>
        
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium flex items-center space-x-2 hover:bg-gray-50 transition-colors">
          <Upload className="h-4 w-4" />
          <span>{type === 'device' ? 'Upload Files' : 'Upload to Cloud'}</span>
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
