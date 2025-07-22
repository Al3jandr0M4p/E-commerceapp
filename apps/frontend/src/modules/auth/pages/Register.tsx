import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authRegister";

import "../../../styles/Main.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await registerUser({ username, email, password });
      console.log(data);

      const redirectPath = "/";
      navigate(redirectPath);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrio un error inesperado");
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
                  Registrate en ShopCap ❤️!
                </h1>
                <p className="underline">Registrarse</p>
                {error && <p className="text-red-600 mt-4">{error}</p>}
              </div>

              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  {/* Entrada del username */}
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 outline-green-700"
                  />
                </div>

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
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 outline-green-700"
                  />
                </div>

                <div>
                  {/* Entrada de la password */}
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 outline-green-700"
                  />
                </div>

                <button className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Registrarte
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

export default Register;
