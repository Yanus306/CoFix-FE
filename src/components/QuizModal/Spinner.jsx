function Spinner({ className = "w-[7.6vh] h-[7.6vh]" }) {
  return (
    <svg
      className={`animate-[spin_1.2s_steps(12)_infinite] ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: 12 }).map((_, i) => {
        const r = Math.round(143 + (15 / 11) * i);
        const g = Math.round(57 + (135 / 11) * i);
        const b = Math.round(248 - (3 / 11) * i);

        return (
          <line
            key={i}
            x1="50"
            y1="16"
            x2="50"
            y2="26" 
            stroke={`rgb(${r}, ${g}, ${b})`}
            strokeWidth="8" 
            strokeLinecap="round" 
            style={{
              transform: `rotate(${i * 30}deg)`,
              transformOrigin: "50px 50px",
            }}
          />
        );
      })}
    </svg>
  );
}

export default Spinner;