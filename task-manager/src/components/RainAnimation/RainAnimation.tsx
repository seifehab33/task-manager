import React from "react";

const RainAnimation: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      {[...Array(100)].map((_, i) => (
        <span
          key={i}
          className="absolute bg-white w-[2px] h-[20px] opacity-70 animate-fall"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 2 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        ></span>
      ))}
    </div>
  );
};

export default RainAnimation;
