function CodingSummary({ 
    filePath = "대기 중...", 
    lastCodingTime = 0, 
    lastTypingWpm = 0, 
    vulnerabilityCount = 0 
}) {
    // 코딩 시간 포맷팅 함수
    const formatTime = (minutes) => {
        if (!minutes) return "0h 0m";
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h > 0 ? h + 'h ' : ''}${m}m`;
    };

    return (
        <div className="panel-base justify-center w-full h-[20vh] gap-[1.11vh]">
            <div className="panel-title">실시간 코딩 요약</div>

            <div className="flex gap-[1.25vw] text-[2.2vh]">
                <div className="font-bold">현재 파일 위치</div>
                {/* 파일 경로 출력 */}
                <div>{filePath}</div>
            </div>

            <div className="flex gap-[2.5vw] text-[2.2vh]">
                <div className="flex gap-[1.25vw]">
                    <div className="font-bold">누적 코딩 시간</div>
                    {/* 시간 포맷 적용 */}
                    <div>{formatTime(lastCodingTime)}</div>
                </div>
                <div>|</div>
                <div className="flex gap-[1.25vw]">
                    <div className="font-bold">현재 타이핑</div>
                    {/* WPM 적용 */}
                    <div>{lastTypingWpm} WPM</div>
                </div>
                <div>|</div>
                <div className="flex gap-[1.25vw]">
                    <div className="font-bold">감지된 약점</div>
                    {/* 취약점 개수 적용 */}
                    <div className={vulnerabilityCount > 0 ? "text-yellow400 font-bold" : ""}>
                        {vulnerabilityCount}건
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodingSummary;