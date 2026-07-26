export default function SlideFadeIn({ children, animationKey, className = "" }) {
  return (
    <div
      key={animationKey} 
      className={`animate-slide-fade-in-left w-full h-full ${className}`}
    >
      {children}
    </div>
  );
}