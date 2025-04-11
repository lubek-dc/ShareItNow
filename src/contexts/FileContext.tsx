import React, { createContext, useState, useContext, useEffect } from 'react';
import { FileType, StorageType } from '../types';
import { generateMockFiles } from '../utils/mockData';

interface FileContextType {
  files: FileType[];
  activeTab: StorageType;
  setActiveTab: (tab: StorageType) => void;
  selectedFiles: FileType[];
  toggleFileSelection: (file: FileType) => void;
  clearSelectedFiles: () => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (isOpen: boolean) => void;
  isReceiveModalOpen: boolean;
  setIsReceiveModalOpen: (isOpen: boolean) => void;
  shareCode: string | null;
  generateShareCode: () => void;
  compressAndShareFiles: () => Promise<void>;
  receiveFileWithCode: (code: string) => Promise<boolean>;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<FileType[]>(generateMockFiles());
  const [activeTab, setActiveTab] = useState<StorageType>('device');
  const [selectedFiles, setSelectedFiles] = useState<FileType[]>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [shareCode, setShareCode] = useState<string | null>(null);

  const toggleFileSelection = (file: FileType) => {
    if (selectedFiles.some(f => f.id === file.id)) {
      setSelectedFiles(selectedFiles.filter(f => f.id !== file.id));
    } else {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  const clearSelectedFiles = () => {
    setSelectedFiles([]);
  };

  const generateShareCode = () => {
    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setShareCode(code);
    
    // Code expires after 10 minutes
    setTimeout(() => {
      setShareCode(null);
    }, 10 * 60 * 1000);
    
    return code;
  };

  const compressAndShareFiles = async () => {
    if (selectedFiles.length === 0) return;
    
    // Simulate compression process
    console.log('Starting compression of selected files...');
    
    // For each selected file, simulate compression
    const compressionResults = selectedFiles.map(file => {
      // Simulate different compression ratios based on file type
      let compressionRatio;
      switch (file.type) {
        case 'image':
          compressionRatio = 0.7 + Math.random() * 0.2; // 70-90% of original
          break;
        case 'document':
          compressionRatio = 0.4 + Math.random() * 0.3; // 40-70% of original
          break;
        case 'video':
          compressionRatio = 0.8 + Math.random() * 0.15; // 80-95% of original
          break;
        case 'audio':
          compressionRatio = 0.6 + Math.random() * 0.3; // 60-90% of original
          break;
        default:
          compressionRatio = 0.5 + Math.random() * 0.4; // 50-90% of original
      }
      
      const compressedSize = Math.floor(file.size * compressionRatio);
      const savedBytes = file.size - compressedSize;
      const algorithm = file.type === 'image' ? 'JPEG Optimized' : 
                        file.type === 'document' ? 'DEFLATE+Dictionary' : 
                        file.type === 'video' ? 'H.264 Frame Analysis' : 
                        'Adaptive LZ77';
      
      return {
        fileName: file.name,
        originalSize: file.size,
        compressedSize,
        compressionRatio: (1 - compressionRatio) * 100,
        savedBytes,
        algorithm,
        processingTime: Math.random() * 2 + 0.5 // 0.5-2.5 seconds
      };
    });
    
    console.log('Compression results:', compressionResults);
    
    // Generate a share code
    const code = generateShareCode();
    console.log(`Files ready to share with code: ${code}`);
    
    return compressionResults;
  };

  const receiveFileWithCode = async (code: string): Promise<boolean> => {
    // Simulate receiving files with a code
    console.log(`Attempting to receive files with code: ${code}`);
    
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate a 80% success rate
    const success = Math.random() < 0.8;
    
    if (success) {
      // Simulate receiving new files
      const receivedFiles = generateMockFiles(2);
      setFiles(prev => [...prev, ...receivedFiles]);
      console.log('Files received successfully:', receivedFiles);
    } else {
      console.log('Failed to receive files. Invalid code or connection issue.');
    }
    
    return success;
  };

  return (
    <FileContext.Provider value={{
      files,
      activeTab,
      setActiveTab,
      selectedFiles,
      toggleFileSelection,
      clearSelectedFiles,
      isShareModalOpen,
      setIsShareModalOpen,
      isReceiveModalOpen,
      setIsReceiveModalOpen,
      shareCode,
      generateShareCode,
      compressAndShareFiles,
      receiveFileWithCode
    }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
};
