function WholeSummary() {
    return (
        <div className="panel-base justify-center w-full h-[14.63vh] gap-[2.04vh]">
            <div className="panel-title">실시간 코딩 요약</div>

            <div className="flex gap-[2.5vw] text-[2.2vh]">
                <div className="flex gap-[1.25vw]">
                    <div className="font-bold">총 코딩 시간</div>
                    <div>54532h</div>
                </div>
                <div>|</div>
                <div className="flex gap-[1.25vw]">
                    <div className="font-bold">누적 발견된 약점 건수</div>
                    <div>10건</div>
                </div>
                <div>|</div>
                <div className="flex gap-[1.25vw]">
                    <div className="font-bold">해결한 약점 건수</div>
                    <div>2건</div>
                </div>
            </div>
        </div>
    );
}

export default WholeSummary;