import React from 'react';
import { FileType } from '../types';
import { formatFileSize } from '../utils/mockData';
import { Zap } from 'lucide-react';

interface QuickStreamInfoProps {
  file: FileType;
}

const QuickStreamInfo: React.FC<QuickStreamInfoProps> = ({ file }) => {
  // Calculate estimated compression ratio based on file type
  const getCompressionEstimate = () => {
    switch (file.type) {
      case 'image':
        return { ratio: 0.65, algorithm: 'JPEG Optimized' };
      case 'document':
        return { ratio: 0.45, algorithm: 'DEFLATE+Dictionary' };
      case 'video':
        return { ratio: 0.85, algorithm: 'H.264 Frame Analysis' };
      case 'audio':
        return { ratio: 0.70, algorithm: 'Adaptive LZ77' };
      case 'archive':
        return { ratio: 0.95, algorithm: 'Already Compressed' };
      default:
        return { ratio: 0.60, algorithm: 'Adaptive LZ77' };
    }
  };

  const { ratio, algorithm } = getCompressionEstimate();
  const compressedSize = Math.floor(file.size * ratio);
  const savedBytes = file.size - compressedSize;
  const compressionPercent = Math.round((1 - ratio) * 100);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-blue-100">
      <div className="flex items-center mb-3">
        <Zap className="h-5 w-5 text-purple-600 mr-2" />
        <h3 className="font-medium text-purple-800">QuickStream Compression</h3>
      </div>
      
      <div className="mb-3">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            style={{ width: `${compressionPercent}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Original: {formatFileSize(file.size)}</span>
          <span>Compressed: {formatFileSize(compressedSize)}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-white/50 p-2 rounded border border-purple-100">
          <div className="text-purple-600 text-xs">Compression</div>
          <div className="text-purple-900 font-medium">{compressionPercent}%</div>
        </div>
        
        <div className="bg-white/50 p-2 rounded border border-purple-100">
          <div className="text-purple-600 text-xs">Space Saved</div>
          <div className="text-purple-900 font-medium">{formatFileSize(savedBytes)}</div>
        </div>
        
        <div className="bg-white/50 p-2 rounded border border-purple-100">
          <div className="text-purple-600 text-xs">Algorithm</div>
          <div className="text-purple-900 font-medium text-xs">{algorithm}</div>
        </div>
        
        <div className="bg-white/50 p-2 rounded border border-purple-100">
          <div className="text-purple-600 text-xs">Transfer Time</div>
          <div className="text-purple-900 font-medium">{Math.round(compressedSize / 1000000 * 2)} sec</div>
        </div>
      </div>
    </div>
  );
};

export default QuickStreamInfo;
