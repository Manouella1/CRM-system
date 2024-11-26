import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { Customer } from "../types";

// Memoiserad komponent för att visa en enskild kund
const CustomerCard = memo(({ customer }: { customer: Customer }) => (
  <div className="border p-4 rounded shadow">
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
));
CustomerCard.displayName = "CustomerCard"; // Namnge memo-komponenten för debugging

const CustomerPage: React.FC = () => {
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [exportData, setExportData] = useState(null);
  const [exportEmail, setExportEmail] = useState(""); // Ändrat från email till exportEmail
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/customers?page=${page}`);
        const newCustomers = response.data;

        setCustomerData((prevData) => {
          const existingIds = new Set(prevData.map((customer) => customer.id));
          const uniqueCustomers = newCustomers.filter(
            (customer: { id: number }) => !existingIds.has(customer.id)
          );
          return [...prevData, ...uniqueCustomers];
        });
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [page]);

  // Exportera kunddata baserat på e-post
  const handleExport = async () => {
    try {
      const response = await axios.get(
        `/api/customers/export?email=${exportEmail}` // Använder exportEmail här
      );
      setExportData(response.data);
      setError(""); // Rensa tidigare felmeddelanden
      alert("Export lyckades! Kolla din nedladdningsmapp.");
    } catch (err) {
      console.error("Error exporting customer data:", err);
      setExportData(null);
      setError("Kunde inte hitta data för angiven e-postadress.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>

      {/* Exportera kunddata */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Exportera Kunddata</h2>
        <div className="flex items-center space-x-4">
          <input
            type="email"
            placeholder="Ange kundens e-post"
            value={exportEmail} // Kopplar korrekt till exportEmail
            onChange={(e) => setExportEmail(e.target.value)}
            className="border p-2 rounded w-64"
          />
          <button
            onClick={handleExport}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Exportera
          </button>
        </div>
        {exportData && (
          <div className="mt-4 p-4 border rounded shadow">
            <h3 className="font-semibold">Exporterad Data:</h3>
            <pre>{JSON.stringify(exportData, null, 2)}</pre>
          </div>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Kundlista */}
      {loading ? (
        <p>Loading customer data...</p>
      ) : (
        <div className="grid gap-4">
          {customerData.length > 0 ? (
            customerData.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))
          ) : (
            <p>No customers available.</p>
          )}
        </div>
      )}
      {!loading && customerData.length > 0 && (
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
