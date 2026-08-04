function Tooltip({ children, text }) {
    return (
        <div className="relative flex items-center justify-center group cursor-pointer">
            {/* 원래 화면에 보여질 요소 */}
            {children}

            {/* 툴팁 박스 */}
            <div className="absolute bottom-full mb-[1vh] hidden group-hover:flex z-50 px-[1vw] py-[0.5vh] bg-gray700 text-gray200 text-[1.5vh] rounded shadow-lg whitespace-nowrap">
                {text}
                
                {/* 툴팁 아래 꼬리 부분 */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-[0.6vh] border-transparent border-t-gray700"></div>
            </div>
        </div>
    );
}

export default Tooltip;