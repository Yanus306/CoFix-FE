const fetchedData = [
    { title: "중첩 반복문", count: 24 },
    { title: "변수명 불일치", count: 20 },
    { title: "예외 처리 누락", count: 12 },
    { title: "괄호 및 기호 누락", count: 8 },
    { title: "최대 9글자까지", count: 5 },
];

function TopIssues5() {
    const issueData = fetchedData.map((item, index) => {
        let color = "text-gray300"; 
        if (index === 0) color = "text-red400"; 
        else if (index === 1) color = "text-yellow400";

        return {
            rank: `${index + 1}위`,   
            title: item.title,    
            hoverText: `${item.count}회`,  
            colorClass: color   
        };
    });

    return (
        <div className="panel-base justify-center w-full h-[23.89vh] gap-[2.41vh]">
            <div className="panel-title">AI 감지 누적 최다 취약점 TOP 5</div>

            <div className="flex flex-col justify-between items-center w-[33.44vw] h-[11.57vh]">
                
                <div className="flex justify-center items-center w-full h-[5.09vh] gap-[1.25vw]">
                    {issueData.slice(0, 2).map((item, index) => (
                        <IssueItem key={index} data={item} />
                    ))}
                </div>

                <div className="flex justify-center items-center w-full h-[5.09vh] gap-[1.25vw]">
                    {issueData.slice(2, 5).map((item, index) => (
                        <IssueItem key={index} data={item} />
                    ))}
                </div>

            </div>
        </div>
    );
}

function IssueItem({ data }) {
    return (
        <div className="group flex justify-center items-center w-[10.31vw] h-[5.09vh] text-[1.48vh] cursor-pointer transition-all duration-200">
            
            <div className="flex justify-between items-center w-full h-full px-[1.04vw] bg-gray800-50 rounded-[1.04vw] group-hover:hidden">
                <div className={`font-bold ${data.colorClass}`}>{data.rank}</div>
                <div className="text-gray400">{data.title}</div>
            </div>

            <div className="hidden justify-center items-center w-full h-full px-[1.04vw] bg-gray700 text-gray200 rounded-[1.04vw] font-bold group-hover:flex">
                {data.hoverText}
            </div>
            
        </div>
    );
}

export default TopIssues5;