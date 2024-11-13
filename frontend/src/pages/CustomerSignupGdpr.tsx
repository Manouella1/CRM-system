import React, { useState } from "react";
import axios from "axios";

const CustomerSignup: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gdprAccepted, setGdprAccepted] = useState<boolean>(false);
  const [showGdprModal, setShowGdprModal] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdprAccepted) {
      alert("Du måste godkänna vår GDPR-policy för att kunna anmäla dig.");
      return;
    }

    const company_id = 1; // Placeholder, ev gör detta dynamiskt
    try {
      const response = await axios.post("/api/customers", {
        company_id,
        name,
        phone,
        address,
        email,
      });
      console.log("Kund tillagd:", response.data);
      alert("Tack för att du anmälde dig till nyhetsbrevet!");
    } catch (error) {
      console.error("Fel vid anmälan:", error);
      alert("Ett fel inträffade vid anmälan. Försök igen senare.");
    }
  };

  return (
    <div className="customer-signup">
      <style>{`
        .customer-signup {
          max-width: 500px;
          margin: 0 auto;
          padding: 2rem;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          color: #333;
        }

        h2 {
          font-size: 1.5rem;
          color: #007bff;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        form div {
          margin-bottom: 1rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }

        input[type="text"],
        input[type="email"] {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }

        .gdpr {
          display: flex;
          align-items: center;
        }

        .gdpr label {
          margin-left: 0.5rem;
          font-size: 0.9rem;
          color: #666;
        }

        .gdpr button {
          background: none;
          border: none;
          color: #007bff;
          cursor: pointer;
          font-size: 0.9rem;
          margin-left: 0.5rem;
          text-decoration: underline;
        }

        .gdpr button:hover {
          color: #0056b3;
        }

        button[type="submit"] {
          width: 100%;
          padding: 0.75rem;
          background-color: #007bff;
          border: none;
          border-radius: 4px;
          color: white;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          margin-top: 1rem;
          transition: background-color 0.3s;
        }

        button[type="submit"]:hover {
          background-color: #0056b3;
        }

        button[type="submit"]:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .gdpr-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          max-width: 500px;
          width: 90%;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .modal-content h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        .modal-content p {
          font-size: 0.95rem;
          color: #333;
          margin-bottom: 1.5rem;
        }

        .modal-content button {
          padding: 0.5rem 1rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 0.95rem;
          cursor: pointer;
        }

        .modal-content button:hover {
          background-color: #0056b3;
        }
      `}</style>

      <h2>Anmäl dig till våra nyhetserbjudanden</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Namn:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Telefon:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Adress:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">E-post:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="gdpr">
          <input
            type="checkbox"
            id="gdpr"
            checked={gdprAccepted}
            onChange={(e) => setGdprAccepted(e.target.checked)}
          />
          <label htmlFor="gdpr">
            Jag godkänner hur ni behandlar personuppgifter
            <button type="button" onClick={() => setShowGdprModal(true)}>
              Läs mer
            </button>
          </label>
        </div>
        <button type="submit" disabled={!gdprAccepted}>
          Anmäl mig
        </button>
      </form>

      {showGdprModal && (
        <div className="gdpr-modal">
          <div className="modal-content">
            <h3>Hur vi behandlar dina personuppgifter</h3>
            <p>
              Vi samlar in dina personuppgifter för att kunna skicka
              nyhetserbjudanden och annan relevant information. Dina uppgifter
              kommer aldrig att delas med tredje part utan ditt uttryckliga
              medgivande.
            </p>
            <button onClick={() => setShowGdprModal(false)}>Stäng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSignup;
