function Create_done({ isOpen, onClose, onLoginClick }) {
  return (
    <div 
      onClick={onClose}
      className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center transition-all duration-500 ${
        isOpen ? 'opacity-100 visible backdrop-blur-[5px]' : 'opacity-0 invisible backdrop-blur-none'
      }`}
    >

      <div 
        onClick={(e) => e.stopPropagation()}
        className={`w-[31vw] min-w-[320px] max-w-[550px] h-[41vh] min-h-[300px] max-h-[400px] bg-gray-700 border-white-5 border rounded-lg flex flex-col justify-center items-center shadow-2xl transition-all duration-500 ease-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="font-bold text-[28px] md:text-[35px] text-gray200 text-center px-4">
          계정 생성이 완료되었습니다.
        </div>
        
      
        <button 
          onClick={() => {
            onClose();      
            onLoginClick(); 
          }}
          className="font-bold text-[18px] md:text-[20px] text-purple-400 mt-6 underline cursor-pointer transition-all focus:outline-none"
        >
          로그인 하러가기
        </button>
      </div>
    </div>
  );
}

export default Create_done;