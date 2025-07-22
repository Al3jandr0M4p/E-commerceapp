import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const email = localStorage.getItem("resetEmail");
  const code = localStorage.getItem("resetCode");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { email, code, new_password: password }
      );
      setMessage((res.data as { message: string }).message);
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetCode");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
      setError("Error al cambiar la contraseña");
    }
  };

  return (
    <>
      <section className="min-h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 p-8">
          <h2 className="text-2xl font-bold">Nueva Contraseña</h2>
          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <button className="bg-green-700 text-white p-2 rounded w-full">
            Cambiar contraseña
          </button>
        </form>
      </section>
    </>
  );
}
