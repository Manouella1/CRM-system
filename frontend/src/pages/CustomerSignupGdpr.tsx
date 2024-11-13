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

              GDPR-Integritetspolicy och Samtycke

              1. Introduktion Vi värnar om din integritet och strävar efter att skydda dina personuppgifter enligt gällande lagstiftning, inklusive Dataskyddsförordningen (GDPR). Denna policy förklarar hur vi samlar in, använder och skyddar dina personuppgifter.

              2. Personuppgifter vi samlar in Vi kan samla in följande typer av personuppgifter:

              Namn
              E-postadress
              Telefonnummer
              IP-adress
              Användarens webbläsarhistorik och cookie-data
              3. Syftet med datainsamling Vi använder dina personuppgifter för:

              Att tillhandahålla och förbättra våra tjänster
              Kommunikation och kundsupport
              Marknadsföringsändamål (med uttryckligt samtycke)
              4. Rättslig grund för behandling av personuppgifter Behandlingen av dina personuppgifter baseras på:

              Samtycke: Du har gett ditt samtycke till att vi får behandla dina uppgifter för ett eller flera specifika ändamål.
              Fullgörande av avtal: När det är nödvändigt för att uppfylla ett avtal med dig.
              5. Dina rättigheter enligt GDPR Du har följande rättigheter:

              Rätt till tillgång: Du har rätt att få information om vilka personuppgifter vi behandlar om dig.
              Rätt till rättelse: Du har rätt att få felaktiga eller ofullständiga personuppgifter rättade.
              Rätt till radering ("rätten att bli glömd"): Du har rätt att begära att vi raderar dina personuppgifter.
              Rätt till begränsning av behandling: Du kan begära att vi begränsar behandlingen av dina personuppgifter.
              Rätt till dataportabilitet: Du kan få ut de personuppgifter du lämnat i ett strukturerat, allmänt använt och maskinläsbart format.
              Rätt att återkalla samtycke: Om behandlingen grundar sig på samtycke kan du när som helst återkalla ditt samtycke.
              6. Samtycke Genom att kryssa i rutan "Jag godkänner" eller genom att använda våra tjänster, samtycker du till vår behandling av dina personuppgifter enligt denna policy. Du har rätt att när som helst dra tillbaka ditt samtycke genom att kontakta oss via [kontaktinformation].

              7. Säkerhet för personuppgifter Vi vidtar lämpliga tekniska och organisatoriska åtgärder för att skydda dina personuppgifter från obehörig åtkomst, förlust, förstöring eller ändring.

              8. Kontakta oss Om du har några frågor om vår behandling av dina personuppgifter, vänligen kontakta oss på:

              E-post: [exempel@domän.com]
              Telefon: [Telefonnummer]
              9. Ändringar av denna policy Vi förbehåller oss rätten att uppdatera denna policy vid behov. Vi kommer att meddela dig om väsentliga ändringar.

            </p>
            <button onClick={() => setShowGdprModal(false)}>Stäng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSignup;
