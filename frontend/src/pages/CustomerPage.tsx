import React, { useState, useEffect } from "react";
import axios from "axios";
import { Customer } from "../types";

//const API_URL = "http://localhost:3000";

const CustomerPage: React.FC = () => {
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`/api/customers?page=${page}`);
        setCustomerData((prevData) => [...prevData, ...response.data]);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [page]);

  // kontrollerad 23:31

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>
      {loading ? (
        <p>Loading customer data...</p>
      ) : (
        <div className="grid gap-4">
          {customerData.length > 0 ? (
            customerData.map((customer) => (
              <div key={customer.id} className="border p-4 rounded shadow">
                <p>
                  <strong>Company ID:</strong> {customer.company_id}
                </p>
                <p>
                  <strong>Name:</strong> {customer.name}
                </p>
                <p>
                  <strong>Phone:</strong> {customer.phone}
                </p>
                <p>
                  <strong>Address:</strong> {customer.address}
                </p>
                <p>
                  <strong>Email:</strong> {customer.email}
                </p>
              </div>
            ))
          ) : (
            <p>No customers available.</p>
          )}
        </div>
      )}
      {!loading && (
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Nästa sida
        </button>
      )}
    </div>
  );
};

export default CustomerPage;
