import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../../../styles/Main.css";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );
      setMessage((res.data as { message: string }).message);
      localStorage.setItem("resetEmail", email);
      navigate("/verify-code");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error inesperado");
      }
    }
  };

  return (
    <>
      <section className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="text-center mb-10">
                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  ShopCap
                </h1>
                <p className="underline">Recupera tu Contraseña</p>
                {message && <p className="text-green-700">{message}</p>}
                {error && <p className="text-red-600 mt-4">{error}</p>}
              </div>

              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  {/* Entrada del email */}
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 outline-green-700"
                  />
                </div>

                <button className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Entrar
                </button>
                <p className="text-sm font-light text-gray-500">
                  ¿Ya tienes una cuenta?{" "}
                  <a href="/" className="font-normal underline">
                    Logueate
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
