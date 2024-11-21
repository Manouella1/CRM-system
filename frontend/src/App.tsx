//import axios from "axios";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CustomerPage from "./pages/CustomerPage";
import CompanyPage from "./pages/CompanyPage";
import CustomerSignup from "./pages/CustomerSignupGdpr";
import CustomerContact from "./pages/CustomerContact";
import Login from "./pages/LoginCompany";
import Register from "./pages/RegisterCompany";
import NewsletterPage from "./pages/CreateNewsletter";
//import { CustomerData } from "./types";

function App() {
  const [heartVisible, setHeartVisible] = useState(false);
  const [heartPosition, setHeartPosition] = useState({ x: 0, y: 0 });
  //const [customerData, setCustomerData] = useState<CustomerData>([]);

  const handleClick = (event: React.MouseEvent<HTMLHeadingElement>) => {
    const { clientX, clientY } = event;
    setHeartPosition({ x: clientX, y: clientY });
    setHeartVisible(true);

    // Dölj hjärtat efter animationens slut
    setTimeout(() => setHeartVisible(false), 1000);
  };

/*   useEffect(() => {
    axios
      .get("/api/customers")
      .then((response) => {
        setCustomerData(response.data);
        console.log("setCustomerData", response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); */

  return (
    <Router>
      <div className="flex flex-wrap justify-center gap-2 p-4">
        <Link
          className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition"
          to="/"
        >
          Home
        </Link>
        <Link
          className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition"
          to="/customers"
        >
          Customers
        </Link>
        <Link
          className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition"
          to="/companies"
        >
          Companies
        </Link>
        <Link
          className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition"
          to="/about"
        >
          About
        </Link>
        <Link
          className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition"
          to="/signup"
        >
          Newsletter
        </Link>
        <Link
          className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition"
          to="/login"
        >
          Login
        </Link>
        <Link
          className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition"
          to="/create-newsletter"
        >
          Create news letter
        </Link>
        <Link
          className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition"
          to="/contact"
        >
          Contact
        </Link>
      </div>

      <Routes>
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/companies" element={<CompanyPage />} />
        <Route path="/signup" element={<CustomerSignup />} />
        <Route path="/contact" element={<CustomerContact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-newsletter" element={<NewsletterPage />} />
      </Routes>

      <div className="flex items-center justify-center h-screen relative">
        <h1
          className="text-xl text-blue-900 font-bold hover:text-blue-400 cursor-pointer"
          onClick={handleClick}
        >
          CRM System
        </h1>
        {/* <div className="absolute right-10 top-1/4 border border-gray-400 p-4 rounded-lg bg-white shadow-lg w-1/3">
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
    </Router>
  );
}

export default App;
