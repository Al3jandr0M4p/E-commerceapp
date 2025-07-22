import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authLogin.ts";

import "../../../styles/Main.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allowNotifications, setAllowNotifications] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser(
        { email, password },
        { remember: allowNotifications }
      );

      let redirectPath = "/";

      switch (data.typeAccount) {
        case 1:
          redirectPath = "shopCap";
          break;
        case 2:
          redirectPath = "/shopCap/ShopsAdministration";
          break;
        case 3:
          redirectPath = "/ShopCap/Administration";
          break;
        default:
          redirectPath = "/";
      }

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
                  Bienvenido a ShopCap
                </h1>
                <p className="underline">Inicia session</p>
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

                {/* solo lo agrego si uso google */}
                {/* <div className="flex items-center">
                  <span className="flex-1 border-t border-gray-300"></span>
                  <span className="px-4 text-sm text-gray-500">O</span>
                  <span className="flex-1 border-t border-gray-300"></span>
                </div> */}

                <div className="flex items-center justify-between gap-15">
                  <div className="flex items-start">
                    {/* hacer que cuando el usuario acepte se le puedan mandar notificaciones al gmail */}
                    <div className="flex items-center h-5">
                      <input
                        aria-describedby="remember"
                        type="checkbox"
                        name="remember"
                        id="remember"
                        checked={allowNotifications}
                        onChange={(e) =>
                          setAllowNotifications(e.target.checked)
                        }
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                      />
                    </div>
                    <div className="ml-2 text-sm">
                      <label htmlFor="remember" className="text-gray-600/90">
                        Recordarme siempre
                      </label>
                    </div>
                  </div>
                  <a
                    href="/forgot-password"
                    className="text-sm font-medium text-black hover:underline"
                  >
                    ¿Olvidaste tu Contraseña?
                  </a>
                </div>

                <button className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Entrar
                </button>
                <p className="text-sm font-light text-gray-500">
                  ¿no tienes una cuenta aun?{" "}
                  <a href="/registrarte" className="font-normal underline">
                    Registrarse
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

export default Login;
