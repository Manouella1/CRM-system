import React, { useState } from "react";

function App() {
  const [heartVisible, setHeartVisible] = useState(false);
  const [heartPosition, setHeartPosition] = useState({ x: 0, y: 0 });

  const handleClick = (event: React.MouseEvent<HTMLHeadingElement>) => {
    const { clientX, clientY } = event;
    setHeartPosition({ x: clientX, y: clientY });
    setHeartVisible(true);

    // Dölj hjärtat efter animationens slut
    setTimeout(() => setHeartVisible(false), 1000);
  };

  return (
    <div className="flex items-center justify-center h-screen relative">
      <h1
        className="text-xl text-blue-900 font-bold hover:text-blue-400 cursor-pointer"
        onClick={handleClick}
      >
        CRM System
      </h1>

      {heartVisible && (
        <div
          key={Math.random()}
          className="absolute text-red-500 text-3xl animate-heart"
          style={{ left: heartPosition.x, top: heartPosition.y }}
        >
          ❤️
        </div>
      )}
    </div>
  );
}

export default App;
