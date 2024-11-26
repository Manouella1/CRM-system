import React from "react";

const GDPRpolicy: React.FC = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">GDPR-Integritetspolicy</h1>
      <p className="mb-4">
        Vi värnar om din integritet och samlar in personuppgifter endast i
        enlighet med GDPR. Här förklarar vi hur vi hanterar dina uppgifter:
      </p>
      <h2 className="text-xl font-semibold mb-2">
        Vilka uppgifter vi samlar in
      </h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Namn, e-postadress och telefonnummer.</li>
        <li>
          Information som krävs för att skicka nyhetsbrev och andra erbjudanden.
        </li>
      </ul>
      <h2 className="text-xl font-semibold mb-2">
        Varför vi samlar in dessa uppgifter
      </h2>
      <p className="mb-4">
        Dina uppgifter används för att förbättra våra tjänster och hålla dig
        uppdaterad med relevant information. Vi delar aldrig dina uppgifter utan
        ditt samtycke.
      </p>
      <h2 className="text-xl font-semibold mb-2">Dina rättigheter</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Rätten att få tillgång till dina uppgifter.</li>
        <li>Rätten att få dina uppgifter raderade eller korrigerade.</li>
        <li>Rätten att dra tillbaka samtycke när som helst.</li>
      </ul>
      <p className="text-gray-700">
        För mer information, kontakta oss på{" "}
        <a
          href="mailto:support@crmsystem.se"
          className="text-blue-500 hover:underline"
        >
          support@crmsystem.se
        </a>
        .
      </p>
    </div>
  );
};

export default GDPRpolicy;
