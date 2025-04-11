import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import FileViewer from './pages/FileViewer';
import ShareModal from './components/ShareModal';
import ReceiveModal from './components/ReceiveModal';
import { FileProvider } from './contexts/FileContext';

function App() {
  return (
    <Router>
      <FileProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/file/:id" element={<FileViewer />} />
          </Routes>
        </Layout>
      </FileProvider>
    </Router>
  );
}

export default App;
