import React from 'react';
import { Smartphone, Cloud } from 'lucide-react';
import { useFiles } from '../contexts/FileContext';
import { StorageType } from '../types';

const TabSelector: React.FC = () => {
  const { activeTab, setActiveTab } = useFiles();

  const handleTabChange = (tab: StorageType) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex border-b border-gray-200 mb-4">
      <button
        className={`flex items-center space-x-2 px-4 py-2 border-b-2 font-medium text-sm ${
          activeTab === 'device'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
        onClick={() => handleTabChange('device')}
      >
        <Smartphone className="h-4 w-4" />
        <span>Device</span>
      </button>
      
      <button
        className={`flex items-center space-x-2 px-4 py-2 border-b-2 font-medium text-sm ${
          activeTab === 'cloud'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
        onClick={() => handleTabChange('cloud')}
      >
        <Cloud className="h-4 w-4" />
        <span>Cloud</span>
      </button>
    </div>
  );
};

export default TabSelector;
