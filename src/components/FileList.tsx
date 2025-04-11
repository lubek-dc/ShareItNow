import React from 'react';
import { File, Image, FileText, Video, Music, Archive, Check } from 'lucide-react';
import { useFiles } from '../contexts/FileContext';
import { FileType } from '../types';
import { formatFileSize } from '../utils/mockData';

interface FileListProps {
  files: FileType[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  const { selectedFiles, toggleFileSelection } = useFiles();

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5 text-blue-500" />;
      case 'document':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />;
      case 'audio':
        return <Music className="h-5 w-5 text-purple-500" />;
      case 'archive':
        return <Archive className="h-5 w-5 text-yellow-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const isSelected = (file: FileType) => {
    return selectedFiles.some(f => f.id === file.id);
  };

  if (files.length === 0) {
    return (
      <div className="text-center py-10">
        <File className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500">No files found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {files.map(file => (
          <li 
            key={file.id}
            className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${
              isSelected(file) ? 'bg-blue-50' : ''
            }`}
            onClick={() => toggleFileSelection(file)}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {file.thumbnail ? (
                  <img 
                    src={file.thumbnail} 
                    alt={file.name} 
                    className="h-10 w-10 rounded object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                    {getFileIcon(file.type)}
                  </div>
                )}
              </div>
              
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)} • {file.lastModified.toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex-shrink-0">
                {isSelected(file) ? (
                  <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
