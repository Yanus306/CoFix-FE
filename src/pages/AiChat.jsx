import ListDetailLayout from '../layouts/ListDetailLayout';
import AiChatList from '../components/aiChat/AiChatList';
import AiChatDetail from '../components/aiChat/AiChatDetail'; 

export default function AiChat() {
  return (
    <ListDetailLayout 
      leftContent={<AiChatList />} 
      rightContent={<AiChatDetail />} 
    />
  );
}