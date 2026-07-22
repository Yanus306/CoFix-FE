import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuthFlow from "./hooks/useAuthFlow";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import ReviewNote from "./pages/ReviewNote";
import AiChat from "./pages/AiChat";
import IdeCode from "./pages/IdeCode";
import Login from "./components/login/Login";
import Create_account from "./components/createaccount/Create_account";
import Create_done from "./components/createaccount/Create_done";

function AppContent() {
  const {
    isModalOpen,
    setIsModalOpen,
    isModalOpen1,
    setIsModalOpen1,
    isDoneOpen,
    setIsDoneOpen,
    isLoggedIn,
    isConnected,
    isWaitingForIde,
    handleSwitchToSignUp,
    handleSignUpComplete,
    handleLoginSuccess,
  } = useAuthFlow();

  return (
    <>
      <Login
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSignUpClick={handleSwitchToSignUp}
        onLoginSuccess={handleLoginSuccess}
      />

      <Create_account
        isOpen1={isModalOpen1}
        onSignUpComplete={handleSignUpComplete}
        onClose1={() => setIsModalOpen1(false)}
      />

      <Create_done
        isOpen={isDoneOpen}
        onClose={() => {
          setIsDoneOpen(false);
          setIsModalOpen(true);
        }}
        onLoginClick={() => {
          setIsDoneOpen(false);
          setIsModalOpen(true);
        }}
      />

      <Routes>
        <Route
          element={
            <MainLayout
              isLoggedIn={isLoggedIn}
              isConnected={isConnected}
              isWaitingForIde={isWaitingForIde}
              onOpenLogin={() => setIsModalOpen(true)}
            />
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/review-note" element={<ReviewNote />} />
          <Route path="/ai-chat" element={<AiChat />} />
          
          <Route path="/ide-code" element={<IdeCode />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;