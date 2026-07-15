export default function ListDetailLayout({ leftContent, rightContent }) {
  return (
    <div className="flex w-full h-full bg-white-3 border-[0.09vh] border-white-5 rounded-[1.04vw]">
      {/* 왼쪽 리스트 구역 */}
      <div className="flex flex-col w-[21.0417vw] h-full px-[1.5625vw] py-[2.5926vh] bg-white-3 border-white-5 rounded-l-[1.04vw] poverflow-y-auto">
        {leftContent}
      </div>

      {/* 오른쪽 상세 내용 구역 */}
      <div className="flex-1 w-full h-full py-[2.5926vh] rounded-r-[1.04vw] ">
        {rightContent}
      </div>
    </div>
  );
}
