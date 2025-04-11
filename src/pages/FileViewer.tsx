import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share, Trash, Info } from 'lucide-react';
import { useFiles } from '../contexts/FileContext';
import { FileType, formatFileSize } from '../types';
import Layout from '../components/Layout';
import QuickStreamInfo from '../components/QuickStreamInfo';

const FileViewer: React.FC = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const navigate = useNavigate();
  const { files, setIsShareModalOpen, toggleFileSelection } = useFiles();
  const [file, setFile] = useState<FileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (fileId) {
      const foundFile = files.find(f => f.id === fileId);
      if (foundFile) {
        setFile(foundFile);
      }
      setIsLoading(false);
    }
  }, [fileId, files]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleShare = () => {
    if (file) {
      toggleFileSelection(file);
      setIsShareModalOpen(true);
    }
  };

  const handleDownload = () => {
    if (file) {
      // In a real app, this would trigger the actual download
      // For now, we'll just show an alert
      alert(`Downloading ${file.name}...`);
    }
  };

  const handleDelete = () => {
    if (file) {
      if (window.confirm(`Are you sure you want to delete ${file.name}?`)) {
        // In a real app, this would delete the file
        alert(`${file.name} would be deleted in a real app.`);
        navigate(-1);
      }
    }
  };

  const renderFilePreview = () => {
    if (!file) return null;

    switch (file.type) {
      case 'image':
        return (
          <div className="flex justify-center bg-gray-100 rounded-lg p-2">
            <img 
              src={file.thumbnail || 'https://via.placeholder.com/400x300?text=Image+Preview'} 
              alt={file.name}
              className="max-w-full max-h-[60vh] object-contain rounded"
            />
          </div>
        );
      case 'video':
        return (
          <div className="bg-gray-900 rounded-lg p-2">
            <div className="aspect-video flex items-center justify-center bg-black rounded">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1"></div>
                </div>
                <p className="text-white text-sm">Video preview not available</p>
                <p className="text-white/70 text-xs mt-1">{file.name}</p>
              </div>
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <div className="w-12 h-12">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18V6L21 12L9 18Z" fill="white"/>
                  </svg>
                </div>
              </div>
              <div className="w-full h-12 bg-white/10 rounded-full mb-4 overflow-hidden">
                <div className="h-full w-1/3 bg-white/30 rounded-full"></div>
              </div>
              <p className="font-medium">{file.name}</p>
              <p className="text-white/70 text-sm mt-1">{formatFileSize(file.size)}</p>
            </div>
          </div>
        );
      case 'document':
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-20 bg-blue-50 border border-blue-100 rounded flex items-center justify-center">
                <div className="w-10 h-10 text-blue-500">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-gray-800 mb-1">{file.name}</h3>
              <p className="text-gray-500 text-sm">{formatFileSize(file.size)}</p>
            </div>
          </div>
        );
      case 'archive':
        return (
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center">
                <div className="w-10 h-10 text-amber-600">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.27002 6.96002L12 12.01L20.73 6.96002" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-amber-800 mb-1">{file.name}</h3>
              <p className="text-amber-600 text-sm">{formatFileSize(file.size)}</p>
              <p className="text-amber-500 text-xs mt-2">Archive contains multiple files</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="w-10 h-10 text-gray-500">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 2V9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-gray-700 mb-1">{file.name}</h3>
              <p className="text-gray-500 text-sm">{formatFileSize(file.size)}</p>
            </div>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (!file) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">File Not Found</h2>
          <p className="text-gray-500 mb-6">The file you're looking for doesn't exist or has been moved.</p>
          <button 
            onClick={handleBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back</span>
          </button>
          <h1 className="text-xl font-bold text-gray-800 truncate max-w-[50%]">{file.name}</h1>
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className={`p-2 rounded-full ${showInfo ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Info className="h-5 w-5" />
          </button>
        </div>

        {/* File Preview */}
        <div className="mb-6">
          {renderFilePreview()}
        </div>

        {/* File Info */}
        {showInfo && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">File Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-blue-600">Name:</div>
              <div className="text-blue-900 font-medium">{file.name}</div>
              
              <div className="text-blue-600">Type:</div>
              <div className="text-blue-900 font-medium capitalize">{file.type}</div>
              
              <div className="text-blue-600">Size:</div>
              <div className="text-blue-900 font-medium">{formatFileSize(file.size)}</div>
              
              <div className="text-blue-600">Modified:</div>
              <div className="text-blue-900 font-medium">{file.lastModified.toLocaleDateString()}</div>
              
              <div className="text-blue-600">Path:</div>
              <div className="text-blue-900 font-medium truncate">{file.path}</div>
            </div>
          </div>
        )}

        {/* QuickStream Info */}
        <div className="mb-6">
          <QuickStreamInfo file={file} />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={handleShare}
            className="flex flex-col items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Share className="h-6 w-6 mb-1" />
            <span className="text-sm">Share</span>
          </button>
          <button 
            onClick={handleDownload}
            className="flex flex-col items-center justify-center p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-6 w-6 mb-1" />
            <span className="text-sm">Download</span>
          </button>
          <button 
            onClick={handleDelete}
            className="flex flex-col items-center justify-center p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash className="h-6 w-6 mb-1" />
            <span className="text-sm">Delete</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default FileViewer;
