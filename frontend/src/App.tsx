import axios from "axios";
import React, { useState, useEffect } from "react";

interface DummyData {
  getDummy: string;
}

function App() {
  const [heartVisible, setHeartVisible] = useState(false);
  const [heartPosition, setHeartPosition] = useState({ x: 0, y: 0 });
  const [dummyData, setDummyData] = useState<DummyData | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLHeadingElement>) => {
    const { clientX, clientY } = event;
    setHeartPosition({ x: clientX, y: clientY });
    setHeartVisible(true);

    // Dölj hjärtat efter animationens slut
    setTimeout(() => setHeartVisible(false), 1000);
  };
  const API_URL = "http://localhost:3000";

  useEffect(() => {
    axios.get(`${API_URL}/dummy`).then((response) => {
      setDummyData(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen relative">
      <h1
        className="text-xl text-blue-900 font-bold hover:text-blue-400 cursor-pointer"
        onClick={handleClick}
      >
        CRM System
      </h1>
      {/* <div>{getDummy}</div> */}

      <div>{dummyData ? dummyData.getDummy : "Loading data..."}</div>

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

// const getDummy = (myTs) =>




// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import Home from "";
// import About from "./components/About";

// function App() {
//   return (
//     <Router>
//       <nav className="flex justify-center space-x-4 p-4">
//         <Link className="text-blue-500 hover:underline" to="/">
//           Hem
//         </Link>
//         <Link className="text-blue-500 hover:underline" to="/about">
//           About
//         </Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
