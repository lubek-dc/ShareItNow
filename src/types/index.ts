export type FileType = {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video' | 'audio' | 'archive' | 'other';
  size: number;
  lastModified: Date;
  path: string;
  thumbnail?: string;
};

export type StorageType = 'device' | 'cloud';

export type CompressionResult = {
  fileName: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  savedBytes: number;
  algorithm: string;
  processingTime: number;
};

export type TransferMethod = 'code' | 'nfc' | 'cloud';
