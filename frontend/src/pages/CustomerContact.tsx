import React, { useState } from "react";
import axios from "axios";
import "../style/contactModal.css";

// const CustomerContact: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);

//   const handleContactSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/contact", { email, message });
//       if (response.status === 200) {
//         alert("Ditt meddelande har skickats!");
//         setEmail("");
//         setMessage("");
//       } else {
//         alert("Ett fel inträffade. Försök igen senare.");
//       }
//     } catch (error) {
//       console.error("Fel vid kontaktförsök:", error);
//       alert("Ett fel inträffade. Försök igen senare.");
//     }
//   };

//   const handleDeleteSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.delete("/api/customers/delete", {
//         data: { email },
//       });
//       if (response.status === 200) {
//         alert("Kontot har raderats om det finns i vårat system.");
//         setEmail("");
//       } else {
//         alert("Ett fel inträffade eller kontot kunde inte hittas.");
//       }
//     } catch (error) {
//       console.error("Fel vid radering:", error);
//       alert("Ett fel inträffade vid radering. Försök igen senare.");
//     }
//   };

//   return (
//     <div className="contact-form">
//       <h2>Kontaktformulär</h2>
//       <form onSubmit={handleContactSubmit}>
//         <div>
//           <label htmlFor="email">E-post:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="message">Meddelande:</label>
//           <textarea
//             id="message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Skicka Meddelande</button>
//       </form>
//       <button onClick={() => setIsDeleteModalVisible(true)}>Radera Konto</button>

//       {isDeleteModalVisible && (
//         <div className="delete-modal">
//           <h3>Bekräfta radering av konto</h3>
//           <p>Fyll i din e-postadress för att radera ditt konto:</p>
//           <form onSubmit={handleDeleteSubmit}>
//             <div>
//               <label htmlFor="delete-email">E-post:</label>
//               <input
//                 type="email"
//                 id="delete-email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit">Bekräfta radering</button>
//           </form>
//           <button onClick={() => setIsDeleteModalVisible(false)}>Avbryt</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerContact;




//TEST 2

const CustomerContact: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isContactModalVisible, setIsContactModalVisible] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);

  const API_URL = "http://localhost:3000"; // Din backend-url

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/contact`, { email, message });
      if (response.status === 200) {
        alert("Ditt meddelande har skickats!");
        setIsContactModalVisible(false);
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error("Fel vid skickande av meddelande:", error);
      alert("Ett fel inträffade. Försök igen senare.");
    }
  };

  const handleDeleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`${API_URL}/api/customers/delete`, {
        data: { email },
      });
      if (response.status === 200) {
        alert("Kontot har raderats om det existerar.");
        setIsDeleteModalVisible(false);
        setEmail("");
      } else {
        alert("Konto hittades inte.");
      }
    } catch (error) {
      console.error("Fel vid radering av konto:", error);
      alert("Ett fel inträffade vid radering. Försök igen senare.");
    }
  };

  return (
    <div className="contact-container">
      <h2>Kontaktformulär</h2>
      <div className="contact-section">
        <button onClick={() => setIsContactModalVisible(true)}>Skicka Meddelande</button>
        {isContactModalVisible && (
          <div className="modal-overlay" onClick={() => setIsContactModalVisible(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Skicka Meddelande</h3>
              <form onSubmit={handleContactSubmit}>
                <div>
                  <label htmlFor="contact-email">E-post:</label>
                  <input
                    type="email"
                    id="contact-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-message">Meddelande:</label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Skicka</button>
              </form>
              <button onClick={() => setIsContactModalVisible(false)}>Stäng</button>
            </div>
          </div>
        )}
      </div>

      <div className="delete-section">
        <button onClick={() => setIsDeleteModalVisible(true)}>Radera Konto</button>
        {isDeleteModalVisible && (
          <div className="modal-overlay" onClick={() => setIsDeleteModalVisible(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Radera Konto</h3>
              <form onSubmit={handleDeleteSubmit}>
                <div>
                  <label htmlFor="delete-email">E-post:</label>
                  <input
                    type="email"
                    id="delete-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Radera</button>
              </form>
              <button onClick={() => setIsDeleteModalVisible(false)}>Stäng</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerContact;
