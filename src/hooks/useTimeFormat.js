export const useTimeFormat = () => {
    const formatTime = (milliseconds) => {
        if (!milliseconds || milliseconds < 0) return "0s 0ms";

        const ms = milliseconds % 1000;
        const totalSeconds = Math.floor(milliseconds / 1000);
        const s = totalSeconds % 60;
        
        const totalMinutes = Math.floor(totalSeconds / 60);
        const m = totalMinutes % 60;
        
        const h = Math.floor(totalMinutes / 60);

        if (h > 0) {
            const paddedM = String(m).padStart(2, '0');
            return `${h}h ${paddedM}m`;
        } else if (totalMinutes > 0) {
            const paddedS = String(s).padStart(2, '0');
            return `${m}m ${paddedS}s`;
        } else {
            return `${s}s ${ms}ms`;
        }
    };

    return formatTime; 
};