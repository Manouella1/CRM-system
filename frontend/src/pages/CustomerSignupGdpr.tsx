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
        <button type="submit">Anmäl mig</button>
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
