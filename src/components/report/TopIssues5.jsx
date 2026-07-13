function TopIssues5() {
    return (
        <div className="panel-base justify-center w-full h-[23.89vh] gap-[2.41vh]">
            <div className="panel-title">AI 감지 누적 최다 취약점 TOP 5</div>

            <div className="flex flex-col justify-between items-center w-[33.44vw] h-[11.57vh]">
                <div className="flex justify-center items-center w-full h-[5.09vh] gap-[1.25vw]">
                    <div className="flex justify-between items-center w-[10.31vw] h-[5.09vh] px-[1.04vw] bg-gray800-50 rounded-[1.04vw] text-[1.48vh]">
                        <div className="font-bold text-red400">1위</div>
                        <div className="text-gray400">중첩 반복문</div>
                    </div>
                    
                    <div className="flex justify-between items-center w-[10.31vw] h-[5.09vh] px-[1.04vw] bg-gray800-50 rounded-[1.04vw] text-[1.48vh]">
                        <div className="font-bold text-yellow400">2위</div>
                        <div className="text-gray400">변수명 불일치</div>
                    </div>
                </div>

                <div className="flex justify-center items-center w-full h-[5.09vh] gap-[1.25vw]">
                    <div className="flex justify-between items-center w-[10.31vw] h-[5.09vh] px-[1.04vw] bg-gray800-50 rounded-[1.04vw] text-[1.48vh]">
                        <div className="font-bold text-gray300">3위</div>
                        <div className="text-gray400">예외 처리 누락</div>
                    </div>

                    <div className="flex justify-between items-center w-[10.31vw] h-[5.09vh] px-[1.04vw] bg-gray800-50 rounded-[1.04vw] text-[1.48vh]">
                        <div className="font-bold text-gray300">4위</div>
                        <div className="text-gray400">괄호 및 기호 누락</div>
                    </div>

                    <div className="flex justify-between items-center w-[10.31vw] h-[5.09vh] px-[1.04vw] bg-gray800-50 rounded-[1.04vw] text-[1.48vh]">
                        <div className="font-bold text-gray300">5위</div>
                        <div className="text-gray400">최대 9글자까지</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopIssues5;