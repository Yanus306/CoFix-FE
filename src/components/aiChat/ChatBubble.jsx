import Logo from "../../assets/logo.png";

export default function ChatBubble({ role, message }) {
  const isUser = role === "user";

  return (
    <div className={`flex items-start w-full mb-[2.5vh] ${isUser ? "justify-end" : "justify-start"}`}>
      
      {!isUser && (
        <img src={Logo} alt="AI" className="shrink-0 w-[4.5vh] h-[4.5vh] mr-[0.8vw] rounded-full" />
      )}

      <div
        className={`max-w-[80%] px-[1.5vw] py-[1.8vh] text-[1.85vh] text-gray200 leading-relaxed 
        ${
          isUser
            ? "bg-purple500-30 rounded-[1.04vw] rounded-br-none" 
            : "bg-gray800-50 border-[0.09vh] border-white-5 rounded-[1.04vw] rounded-tl-none" 
        }`}
      >
        <span className="whitespace-pre-wrap wrap-break-words">{message}</span>
      </div>
      
    </div>
  );
}