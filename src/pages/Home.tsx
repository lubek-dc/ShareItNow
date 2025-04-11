import React, { useState } from 'react';
import { Share, Download, Search, X } from 'lucide-react';
import TabSelector from '../components/TabSelector';
import FileList from '../components/FileList';
import { useFiles } from '../contexts/FileContext';

const Home: React.FC = () => {
  const { 
    files, 
    activeTab, 
    selectedFiles, 
    clearSelectedFiles,
    setIsShareModalOpen,
    setIsReceiveModalOpen
  } = useFiles();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const filteredFiles = files.filter(file => {
    // Filter by tab (device/cloud)
    const matchesTab = activeTab === 'device' ? 
      !file.path.includes('cloud') : 
      file.path.includes('cloud');
    
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      file.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
  const handleShareClick = () => {
    if (selectedFiles.length > 0) {
      setIsShareModalOpen(true);
    }
  };
  
  const handleReceiveClick = () => {
    setIsReceiveModalOpen(true);
  };
  
  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      setSearchQuery('');
    }
  };
  
  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">Your Files</h1>
        
        <div className="flex space-x-2">
          {isSearchActive ? (
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files..."
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={toggleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={toggleSearch}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <Search className="h-5 w-5" />
            </button>
          )}
          
          <button
            onClick={handleReceiveClick}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <Download className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleShareClick}
            disabled={selectedFiles.length === 0}
            className={`p-2 rounded-md ${
              selectedFiles.length > 0
                ? 'text-blue-600 hover:bg-blue-50'
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            <Share className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-md p-3 mb-4 flex justify-between items-center">
          <p className="text-blue-700">
            <span className="font-medium">{selectedFiles.length}</span> file(s) selected
          </p>
          <div className="flex space-x-2">
            <button
              onClick={clearSelectedFiles}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear
            </button>
            <button
              onClick={handleShareClick}
              className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Share
            </button>
          </div>
        </div>
      )}
      
      <TabSelector />
      
      <FileList files={filteredFiles} />
    </div>
  );
};

export default Home;
