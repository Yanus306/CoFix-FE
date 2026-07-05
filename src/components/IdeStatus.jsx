function IdeStatus({ isConnected = false }) {
    return (
        <div className="flex justify-end w-full h-[6.39vh]">
            <div 
                className={`
                    flex justify-center items-center w-[11.93vw] h-full rounded-[1.04vw] border text-[2.22vh] font-bold transition-colors
                    ${isConnected 
                        ? 'bg-green500-10 border-green500-20 text-green400' 
                        : 'bg-red500-10 border-red500-20 text-red400'
                    }
                `}
            >
                {isConnected ? '🟢 IDE 연동 중' : '🔴 IDE 연동 전'}
            </div>
        </div>
    );
}

export default IdeStatus;