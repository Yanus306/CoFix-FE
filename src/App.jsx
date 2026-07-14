import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import ReviewNote from './pages/ReviewNote';
import AiChat from './pages/AiChat';
import Login from './components/login/Login';
import Create_account from './components/createaccount/Create_account';

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
        <Route path="/sign-up" element={<Login />} />
        <Route path="/create-account" element={<Create_account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;