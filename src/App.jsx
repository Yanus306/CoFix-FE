import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import ReviewNote from './pages/ReviewNote';
import AiChat from './pages/AiChat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/review-note" element={<ReviewNote />} />
          <Route path="/ai-chat" element={<AiChat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;