import { FileType } from '../types';

export const generateMockFiles = (count = 10): FileType[] => {
  const fileTypes: Array<'image' | 'document' | 'video' | 'audio' | 'archive' | 'other'> = [
    'image', 'document', 'video', 'audio', 'archive', 'other'
  ];
  
  const imageExtensions = ['jpg', 'png', 'gif', 'webp'];
  const documentExtensions = ['pdf', 'docx', 'xlsx', 'txt'];
  const videoExtensions = ['mp4', 'mov', 'avi', 'mkv'];
  const audioExtensions = ['mp3', 'wav', 'ogg', 'flac'];
  const archiveExtensions = ['zip', 'rar', '7z', 'tar'];
  const otherExtensions = ['exe', 'dll', 'bin', 'dat'];
  
  const getRandomExtension = (type: string) => {
    switch (type) {
      case 'image': return imageExtensions[Math.floor(Math.random() * imageExtensions.length)];
      case 'document': return documentExtensions[Math.floor(Math.random() * documentExtensions.length)];
      case 'video': return videoExtensions[Math.floor(Math.random() * videoExtensions.length)];
      case 'audio': return audioExtensions[Math.floor(Math.random() * audioExtensions.length)];
      case 'archive': return archiveExtensions[Math.floor(Math.random() * archiveExtensions.length)];
      default: return otherExtensions[Math.floor(Math.random() * otherExtensions.length)];
    }
  };
  
  const getRandomFileName = (type: string) => {
    const names = {
      image: ['Photo', 'Screenshot', 'Image', 'Picture', 'Wallpaper'],
      document: ['Report', 'Document', 'Presentation', 'Spreadsheet', 'Notes'],
      video: ['Video', 'Movie', 'Recording', 'Clip', 'Footage'],
      audio: ['Song', 'Recording', 'Podcast', 'Audio', 'Track'],
      archive: ['Archive', 'Backup', 'Compressed', 'Files', 'Package'],
      other: ['File', 'Data', 'Program', 'App', 'Binary']
    };
    
    const nameList = names[type as keyof typeof names] || names.other;
    const name = nameList[Math.floor(Math.random() * nameList.length)];
    const number = Math.floor(Math.random() * 1000);
    const ext = getRandomExtension(type);
    
    return `${name}_${number}.${ext}`;
  };
  
  const getRandomSize = (type: string) => {
    // Size in bytes
    switch (type) {
      case 'image': return Math.floor(Math.random() * 10 * 1024 * 1024) + 500 * 1024; // 500KB - 10MB
      case 'document': return Math.floor(Math.random() * 5 * 1024 * 1024) + 50 * 1024; // 50KB - 5MB
      case 'video': return Math.floor(Math.random() * 500 * 1024 * 1024) + 20 * 1024 * 1024; // 20MB - 500MB
      case 'audio': return Math.floor(Math.random() * 50 * 1024 * 1024) + 3 * 1024 * 1024; // 3MB - 50MB
      case 'archive': return Math.floor(Math.random() * 100 * 1024 * 1024) + 1 * 1024 * 1024; // 1MB - 100MB
      default: return Math.floor(Math.random() * 20 * 1024 * 1024) + 100 * 1024; // 100KB - 20MB
    }
  };
  
  const getRandomThumbnail = (type: string) => {
    if (type === 'image') {
      const imageIds = [
        '1606-eGJiYfxdrWQ', '1603-7lLunb-4oX4', '1605-Ql3eqLuRCJA', 
        '1604-NWdPOT9akO0', '1602-LB9dxQGBxDo', '1601-pHANr-CpbYM'
      ];
      const randomId = imageIds[Math.floor(Math.random() * imageIds.length)];
      return `https://images.unsplash.com/photo-${randomId}?auto=format&fit=crop&w=100&q=60`;
    }
    return undefined;
  };
  
  const files: FileType[] = [];
  
  for (let i = 0; i < count; i++) {
    const type = fileTypes[Math.floor(Math.random() * fileTypes.length)];
    const name = getRandomFileName(type);
    const size = getRandomSize(type);
    const lastModified = new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)); // Random date in the last 30 days
    
    files.push({
      id: `file-${i}-${Date.now()}`,
      name,
      type,
      size,
      lastModified,
      path: `/storage/${type}s/${name}`,
      thumbnail: getRandomThumbnail(type)
    });
  }
  
  return files;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileIcon = (type: string): string => {
  switch (type) {
    case 'image': return 'image';
    case 'document': return 'file-text';
    case 'video': return 'video';
    case 'audio': return 'music';
    case 'archive': return 'archive';
    default: return 'file';
  }
};
