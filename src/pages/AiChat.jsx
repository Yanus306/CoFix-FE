import ListDetailLayout from "../layouts/ListDetailLayout";
import AiChatList from "../components/aiChat/AiChatList";
import AiChatDetail from "../components/aiChat/AiChatDetail";
import { useAiChat } from "../hooks/useAiChat"; 

export default function AiChat() {
  const {
    sessions,
    currentMessages,
    currentSessionId,
    handleNewChat,
    handleSessionClick,
    handleCreateNewSession,
    handleRenameSession,
    handleDeleteSession,
  } = useAiChat(); 

  return (
    <ListDetailLayout
      leftContent={
        <AiChatList
          sessions={sessions}
          currentSessionId={currentSessionId}
          onNewChat={handleNewChat}
          onSessionClick={handleSessionClick}
          onRenameSession={handleRenameSession}
          onDeleteSession={handleDeleteSession}
        />
      }
      rightContent={
        <AiChatDetail
          sessionId={currentSessionId}
          initialMessages={currentMessages}
          isNewChat={currentSessionId === null}
          onCreateSession={handleCreateNewSession}
        />
      }
    />
  );
}