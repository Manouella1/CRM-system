import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
declare const alert: (message?: unknown) => void;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const {
        data: { token },
      } = await axios.post("/api/login", { email, password });
      localStorage.setItem("token", token);
      // Hantera lyckad inloggning, till exempel lagra token i localStorage
      alert("Login successful!");
      navigate("/customers");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed");
    }
  };
  return (
    <div className="login-container">
      <style>{`
        .login-container {
          max-width: 400px;
          margin-top: 20rem;
          margin: 0 auto;
          padding: 2rem;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          font-family: Arial, sans-serif;
          color: #333;
          text-align: center;
        }

        h2 {
          font-size: 1.8rem;
          color: #007bff;
          margin-bottom: 1.5rem;
        }

        form div {
          margin-bottom: 1rem;
          text-align: left;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
          color: #333;
        }

        input[type="email"],
        input[type="password"] {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }

        input[type="email"]:focus,
        input[type="password"]:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
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

        p {
          margin-top: 1rem;
          font-size: 0.9rem;
        }

        a {
          color: #007bff;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don&apos;t have an account? <Link to="/register">Register here</Link>
      </p>
      <p className="mt-4 text-sm text-gray-600 text-center">
        Genom att logga in godkänner du att vi hanterar dina personuppgifter
        enligt vår{" "}
        <span
          onClick={openModal}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          integritetspolicy
        </span>
        .
      </p>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <h3 className="text-xl font-semibold mb-4">
              Hur vi behandlar dina personuppgifter
            </h3>
            <div className="max-h-96 overflow-y-auto text-left">
              <p className="mb-4">
                Vi samlar in dina personuppgifter för att kunna skicka
                nyhetserbjudanden och annan relevant information. Dina uppgifter
                kommer aldrig att delas med tredje part utan ditt uttryckliga
                medgivande.
              </p>
              <h4 className="font-medium mb-2">
                GDPR-Integritetspolicy och Samtycke
              </h4>
              <p className="mb-4">
                Läs vår fullständiga{" "}
                <a
                  href="/gdpr-policy" // Länk till GDPR-policyn här
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  integritetspolicy
                </a>
                för mer information.
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Vi samlar in namn, e-postadress och telefonnummer.</li>
                <li>
                  Vi kommer endast att använda dina uppgifter för att skicka
                  relevant information om våra tjänster.
                </li>
                <li>
                  Du har rätt att när som helst begära att dina personuppgifter
                  tas bort eller ändras.
                </li>
              </ol>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Stäng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
