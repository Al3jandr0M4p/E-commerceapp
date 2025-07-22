import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function VerifyCode() {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string>("");

  const email = localStorage.getItem("resetEmail");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/verify-reset-code", {
        email,
        code,
      });
      localStorage.setItem("resetCode", code);
      navigate("/reset-password");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
      setError("Codigo incorrecto");
    }
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 p-8">
          <h1 className="text-2xl font-bold">Ingresa el codigo</h1>
          {error && <p className="text-red-600">{error}</p>}
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <button className="bg-green-700 text-white p-2 rounded w-full">
            Verificar
          </button>
        </form>
      </section>
    </>
  );
}
