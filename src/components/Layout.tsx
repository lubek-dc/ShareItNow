import React from 'react';
import { Share, Download, Menu, X } from 'lucide-react';
import { useFiles } from '../contexts/FileContext';
import ShareModal from './ShareModal';
import ReceiveModal from './ReceiveModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { 
    setIsShareModalOpen, 
    setIsReceiveModalOpen, 
    isShareModalOpen,
    isReceiveModalOpen,
    selectedFiles,
    clearSelectedFiles
  } = useFiles();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleReceiveClick = () => {
    setIsReceiveModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Share className="h-6 w-6" />
            <h1 className="text-xl font-bold">ShareItNow</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <button 
              onClick={handleShareClick}
              className="px-4 py-2 bg-white text-blue-600 rounded-md font-medium flex items-center space-x-2 hover:bg-blue-50 transition-colors"
            >
              <Share className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button 
              onClick={handleReceiveClick}
              className="px-4 py-2 bg-white text-blue-600 rounded-md font-medium flex items-center space-x-2 hover:bg-blue-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Receive</span>
            </button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-700 py-2">
            <div className="container mx-auto px-4 flex flex-col space-y-2">
              <button 
                onClick={() => {
                  handleShareClick();
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-2 bg-white text-blue-600 rounded-md font-medium flex items-center space-x-2"
              >
                <Share className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button 
                onClick={() => {
                  handleReceiveClick();
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-2 bg-white text-blue-600 rounded-md font-medium flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Receive</span>
              </button>
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2023 ShareItNow. All rights reserved.</p>
          <p className="mt-1">Fast, secure file sharing with QuickStream compression technology.</p>
        </div>
      </footer>
      
      {/* Modals */}
      {isShareModalOpen && <ShareModal />}
      {isReceiveModalOpen && <ReceiveModal />}
    </div>
  );
};

export default Layout;
