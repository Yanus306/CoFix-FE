function CodingSummary() {
    return (
        <div className="panel-base justify-center w-full h-[20vh] gap-[1.11vh]">
            <div className="panel-title">실시간 코딩 요약</div>

            <div className="flex gap-[1.25vw] text-[2.2vh]">
                <div className="font-bold">현재 파일 위치</div>
                <div>C:\Users\사용자\폴더명\다른폴더명\파일명?</div>
            </div>

            <div className="flex gap-[2.5vw] text-[2.2vh]">
                <div className="flex gap-[1.25vw]">
                    <div className="font-bold">누적 코딩 시간</div>
                    <div>2h 15m</div>
                </div>
                <div>|</div>
                <div className="flex gap-[1.25vw]">
                    <div className="font-bold">현재 타이핑</div>
                    <div>65 WPM</div>
                </div>
                <div>|</div>
                <div className="flex gap-[1.25vw]">
                    <div className="font-bold">감지된 약점</div>
                    <div>2건</div>
                </div>
            </div>
        </div>
    );
}

export default CodingSummary;