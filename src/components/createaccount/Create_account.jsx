import { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';

// 💡 부모로부터 isOpen, onClose, 그리고 로그인 창으로 돌아가는 onLoginClick을 받습니다.
function CreateAccount({ isOpen, onClose, onLoginClick }) {
  // 애니메이션 트리거를 위한 내부 상태
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 마운트 직후 트랜지션이 부드럽게 먹히도록 찰나의 지연을 줍니다.
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    /* 1. 어두운 배경 (페이드 인) */
    <div 
      onClick={onClose}
      className={`fixed inset-0 bg-black/60 z-50 flex items-center justify-center transition-opacity duration-300 ${
        animate ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 2. 회원가입 카드 본체 (스케일 업 + 페이드 인) */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative w-[750px] h-[780px] bg-gray-700 border-white/5 border-2 rounded-md flex justify-center items-center flex-col gap-4 bg-center shadow-2xl select-none transform transition-all duration-300 ${
          animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* 우측 상단 닫기(X) 버튼 */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 text-gray-400 hover:text-white text-3xl font-semibold cursor-pointer"
        >
          &times;
        </button>

        {/* 로고 영역 */}
        <div className="p-6">
          <img 
            src={logo} 
            alt="로고" 
            className="w-full h-[180px] object-cover rounded-full shadow-lg flex justify-center items-center"
          />
        </div>

        {/* 아이디 입력 영역 */}
        <div className="text-gray-200 w-full text-left px-20 mt-2">아이디</div>
        <input 
          type="text" 
          className="w-[572px] h-[53px] bg-gray-800 border-white/5 border rounded-lg cursor-pointer pl-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          placeholder="아이디를 입력해주세요"
        />

        {/* 비밀번호 입력 영역 */}
        <div className="text-gray-200 w-full text-left px-20 mt-2">비밀번호</div>
        <input 
          type="password" 
          className="w-[572px] h-[53px] bg-gray-800 border-white/5 border rounded-lg cursor-pointer pl-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          placeholder="비밀번호를 입력해주세요"
        />

        {/* 비밀번호 확인 입력 영역 */}
        <div className="text-gray-200 w-full text-left px-20 mt-2">비밀번호 확인</div>
        <input 
          type="password" 
          className="w-[572px] h-[53px] bg-gray-800 border-white/5 border rounded-lg cursor-pointer pl-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          placeholder="비밀번호를 한번 더 입력해주세요"
        />

        {/* 회원가입 완료 버튼 */}
        <button className="w-[291px] h-[81px] bg-gray-800/50 border-white/5 border rounded-4xl cursor-pointer text-purple-400 flex justify-center items-center text-[35px] mt-8 font-bold hover:bg-gray-600/50 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500">
          회원가입
        </button>

        {/* 하단 로그인 유도 영역 */}
        <div className="text-gray-200 w-fit text-center mt-4 text-[13px]">
          <span>이미 계정이 있으신가요? </span>
          <span 
            onClick={onLoginClick} 
            className="text-blue-500 text-[13px] underline cursor-pointer"
          >
            로그인
          </span>
        </div>

      </div>
    </div>
  );
}

export default CreateAccount;