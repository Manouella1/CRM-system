import axios from "axios";
import React, { useState, useEffect } from "react";
import { DummyData, CustomerData } from "./types";
// import { Customer } from ".types"
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import Home from "";
// import About from "./components/About";

function App() {
  const [heartVisible, setHeartVisible] = useState(false);
  const [heartPosition, setHeartPosition] = useState({ x: 0, y: 0 });
  const [dummyData, setDummyData] = useState<DummyData[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData>([]);

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

  useEffect(() => {
    axios
      .get(`${API_URL}/api/customers`)
      .then((response) => {
        setCustomerData(response.data);
        console.log("setCustomerData", response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
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
      <div className="absolute right-10 top-1/4 border border-gray-400 p-4 rounded-lg bg-white shadow-lg w-1/3">
        <h2 className="text-lg font-semibold mb-2">Dummy Data:</h2>
        {dummyData.length > 0 ? (
          dummyData.map((item) => (
            <div key={item.id} className="mb-2">
              <p>Name: {item.name}</p>
              <p>Nyhetsbrev: {item.nyhetsbrev ? "Yes" : "No"}</p>
              <p>Betalat: {item.betalat ? "Yes" : "No"}</p>
            </div>
          ))
        ) : (
          <p>Loading dummy data...</p>
        )}

        <h2 className="text-lg font-semibold mt-4 mb-2">Customer Data:</h2>
        {customerData.length > 0 ? (
          customerData.map((customer) => (
            <div key={customer.id} className="mb-2">
              <p>Company ID: {customer.company_id}</p>
              <p>Name: {customer.name}</p>
              <p>Phone: {customer.phone}</p>
              <p>Address: {customer.address}</p>
              <p>Email: {customer.email}</p>
            </div>
          ))
        ) : (
          <p>Loading customer data...</p>
        )}
      </div>

      {/* <div>{dummyData ? dummyData.getDummy : "Loading data..."}</div>
      <div>
        {customerData ? customerData.getCustomerData : "Loading data..."}
      </div> */}

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

// import React from "react";

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
