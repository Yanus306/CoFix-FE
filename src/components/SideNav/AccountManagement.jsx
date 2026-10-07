import { useState, useEffect, useRef } from 'react';
import logo from '../../assets/logo.png'; // 임시 프로필 사진용 로고 경로

function AccountManagement({ isOpen, onClose }) {
  // 사용자 정보 상태 관리 (뱃지 및 가입 연도 포함)
  const [userInfo, setUserInfo] = useState({
    username: '',
    nickname: '',
    badgeCount: 5, // 💡 임의의 뱃지 개수
    joinedYear: '2026', // 💡 임의의 가입 연도
  });

  // 수정 모드 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  const [tempNickname, setTempNickname] = useState('');
  
  // 프로필 사진 미리보기 상태 (로컬 파일 선택용)
  const [profileImage, setProfileImage] = useState(logo);
  const [tempProfileImage, setTempProfileImage] = useState(logo); // 취소 시 복구용 임시 이미지
  const fileInputRef = useRef(null);

  // 회원탈퇴 확인 모달 및 2초 카운트다운 상태 관리
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(2);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const savedNickname = localStorage.getItem('nickname');
      const savedUsername = localStorage.getItem('username');
      const savedProfileImg = localStorage.getItem('profileImage');
      const savedUserInfoStr = localStorage.getItem('userInfo');
      
      let parsedUser = {};
      if (savedUserInfoStr) {
        try {
          parsedUser = JSON.parse(savedUserInfoStr);
        } catch (e) {
          console.error("userInfo 파싱 오류:", e);
        }
      }

      const currentNickname = savedNickname || parsedUser.nickname || '사용자';
      setUserInfo({
        username: parsedUser.username || savedUsername || '',
        nickname: currentNickname,
        badgeCount: parsedUser.badgeCount || 5,
        joinedYear: parsedUser.joinedYear || '2026',
      });
      setTempNickname(currentNickname);

      const currentImg = savedProfileImg || logo;
      setProfileImage(currentImg);
      setTempProfileImage(currentImg);
      
      // 모달이 열릴 때는 항상 일반 보기 모드로 초기화
      setIsEditing(false);
      setIsDeleteModalOpen(false);
    }
  }, [isOpen]);

  // 회원탈퇴 모달이 열릴 때 2초 카운트다운 시작
  useEffect(() => {
    if (isDeleteModalOpen) {
      setCountdown(2);
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isDeleteModalOpen]);

  // 프로필 사진 파일 선택창 열기
  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 업로드 시 임시 미리보기 반영
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempProfileImage(imageUrl);
    }
  };

  // 수정 완료 및 저장 처리
  const handleSave = () => {
    if (!tempNickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    // 상태 최종 업데이트
    setUserInfo(prev => ({ ...prev, nickname: tempNickname }));
    setProfileImage(tempProfileImage);

    // 로컬 스토리지 반영
    localStorage.setItem('nickname', tempNickname);
    localStorage.setItem('profileImage', tempProfileImage);
    
    const savedUserInfoStr = localStorage.getItem('userInfo');
    if (savedUserInfoStr) {
      try {
        const parsed = JSON.parse(savedUserInfoStr);
        parsed.nickname = tempNickname;
        localStorage.setItem('userInfo', JSON.stringify(parsed));
      } catch (e) {
        console.error(e);
      }
    }

    // 사이드바 등 전파를 위한 신호 발생
    window.dispatchEvent(new Event('login-success'));

    setIsEditing(false);
  };

  // 수정 취소 처리 (원래 값으로 복구)
  const handleCancel = () => {
    setTempNickname(userInfo.nickname);
    setTempProfileImage(profileImage);
    setIsEditing(false);
  };

  // 실제 회원탈퇴 최종 확인 처리
  const handleConfirmDelete = () => {
    if (countdown > 0) return;
    
    alert('회원탈퇴가 완료되었습니다.');
    localStorage.clear(); 
    window.dispatchEvent(new Event('login-success'));
    setIsDeleteModalOpen(false);
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-[0.18vh] transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* 계정 관리 모달 박스 */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className={`relative w-[42.7vw] max-w-[42.7vw] h-[72vh] max-h-[72vh] bg-[#1F2937] border border-white/10 rounded-2xl shadow-2xl flex flex-col items-center pt-[3vh] px-[2.5vw] pb-[3.5vh] select-none text-white overflow-y-auto transition-all duration-300 ease-out transform ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          
          {/* X 닫기 버튼 */}
          <button 
            onClick={onClose}
            className="absolute top-[2.2vh] right-[1.6vw] text-gray400 hover:text-white text-[2.77vh] font-semibold cursor-pointer focus:outline-none transition-all z-10"
          >
            &times;
          </button>

          {/* 상단 타이틀: 계정 관리 */}
          <h2 className="text-[3vh] font-[800] mt-[0.2vh] mb-[1.2vh]">
            계정 관리
          </h2>

          {/* 첫 번째 구분선 */}
          <div className="w-full h-[1px] bg-white/10 mb-[1.8vh]"></div>

          {/* [섹션 1] 현재 프로필 타이틀 */}
          <div className="text-[1.6vh] font-bold text-gray300 mb-[1vh]">
            현재 프로필
          </div>

          {/* 현재 프로필 카드 (상하 높이를 기존보다 컴팩트하게 줄임) */}
          <div className={`relative w-[36.4vw] max-w-[36.4vw] h-[26vh] max-h-[26vh] bg-[#374151]/60 rounded-[1rem] flex items-center px-[2.8vh] shadow-md mb-[2vh] transition-all duration-300 ${
            isEditing ? 'border-2 border-[#D501FF] shadow-[0_0_15px_rgba(213,1,255,0.3)]' : 'border border-white-5'
          }`}>
            
            {/* 우측 상단 영역: 톱니바퀴 / 완료·취소 버튼 */}
            <div className="absolute top-[1.8vh] right-[1.8vh] z-20 flex items-center">
              {!isEditing ? (
                <div className="relative flex items-center justify-center group">
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="text-gray-400 hover:text-white text-[2.2vh] cursor-pointer focus:outline-none transition-transform duration-300 group-hover:rotate-180 p-1 flex items-center justify-center"
                  >
                    ⚙️
                  </button>
                  {/* 툴팁 */}
                  <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 bg-gray-900 text-white text-[1.1vh] font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md border border-white/10">
                    프로필 수정
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-[0.5vw]">
                  {/* 완료 버튼 */}
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-[0.9vw] py-[0.3vh] bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white text-[1.2vh] font-bold rounded-lg cursor-pointer shadow"
                  >
                    완료
                  </button>
                  {/* 취소 버튼 */}
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-[0.9vw] py-[0.3vh] bg-transparent border border-red-500 text-red-400 hover:bg-red-500 hover:text-white text-[1.2vh] font-bold rounded-lg cursor-pointer shadow"
                  >
                    취소
                  </button>
                </div>
              )}
            </div>

            {/* 왼쪽: 프로필 사진 */}
            <div className="flex items-center gap-[2vw] w-full">
              <div 
                onClick={handleImageClick}
                className={`relative w-[14vh] h-[14vh] max-h-[14vh] rounded-full overflow-hidden shadow-lg shrink-0 transition-all duration-300 ${
                  isEditing 
                    ? 'cursor-pointer group border-2 border-[#D501FF] shadow-[0_0_12px_rgba(213,1,255,0.4)]' 
                    : 'border border-white-5'
                }`}
              >
                <img 
                  src={isEditing ? tempProfileImage : profileImage} 
                  alt="프로필 사진" 
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[1.6vh] font-semibold gap-0.5">
                    <span className="text-[1.8vh]">✏️</span>
                    <span>사진 변경</span>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              {/* 닉네임, 아이디 및 부가 정보 영역 */}
              <div className="flex flex-col gap-[0.6vh] grow pr-[2.5vh]">
                {isEditing ? (
                  <div className="w-[17vw]">
                    <input
                      type="text"
                      value={tempNickname}
                      onChange={(e) => setTempNickname(e.target.value)}
                      className="w-full bg-[#1F2937] border border-[#D501FF] rounded-lg px-2 py-1 text-[3vh] font-[800] text-white focus:outline-none shadow-inner"
                      placeholder="닉네임 입력"
                      autoFocus
                    />
                  </div>
                ) : (
                  <span className="text-[3.2vh] font-[800] text-white">
                    {userInfo.nickname}
                  </span>
                )}

                <div className="text-[1.35vh] font-bold text-gray400 flex flex-col gap-[0.2vh]">
                  <span>아이디 : {userInfo.username}</span>
                  <span>획득한 뱃지 : {userInfo.badgeCount}개</span>
                  <span>가입 연도 : {userInfo.joinedYear}년</span>
                </div>
              </div>
            </div>
          </div>

          {/* 두 번째 구분선 */}
          <div className="w-full h-[1px] bg-white/10 mb-[1.8vh]"></div>

          {/* [섹션 2] 기타 타이틀 */}
          <div className="text-[1.6vh] font-bold text-gray300 mb-[1vh]">
            기타
          </div>

          {/* 기타 섹션 버튼 (회원탈퇴) */}
          <div className="w-[36.4vw] max-w-[36.4vw]">
            <button 
              type="button"
              className="w-full h-[5.8vh] max-h-[5.8vh] bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-[1rem] font-bold text-[1.5vh] transition-all cursor-pointer shadow flex items-center justify-center"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              회원탈퇴
            </button>
          </div>

        </div>
      </div>

      {/* 회원탈퇴 최종 확인 서브 모달 */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center backdrop-blur-[0.2vh]">
          <div className="w-[28vw] bg-[#1F2937] border border-white/10 rounded-2xl shadow-2xl p-[2.5vh] flex flex-col items-center text-white select-none">
            <h3 className="text-[2.2vh] font-[800] mb-[1.5vh]">회원 탈퇴</h3>
            <p className="text-[1.5vh] text-gray300 text-center mb-[2.5vh]">
              정말 회원 탈퇴를 진행하시겠습니까?<br />
              탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다.
            </p>
            <div className="flex items-center gap-[1vw] w-full">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-1/2 h-[5vh] bg-[#374151] hover:bg-[#4b5563] text-white text-[1.5vh] font-bold rounded-xl transition-all cursor-pointer shadow"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={countdown > 0}
                className={`w-1/2 h-[5vh] text-[1.5vh] font-bold rounded-xl transition-all shadow flex items-center justify-center ${
                  countdown > 0
                    ? 'bg-red-500/30 text-red-300 cursor-not-allowed opacity-60'
                    : 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                }`}
              >
                {countdown > 0 ? `확인 (${countdown})` : '확인'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AccountManagement;