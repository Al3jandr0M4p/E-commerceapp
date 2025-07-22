/**
 * @param {string} username - envio del nombre del usuario
 * @param {string} email - envio del email del usuario
 * @param {string} password - envio de la password del usuario podria usar un union type para manejar el hash
 */
interface Credentials {
  username: string;
  email: string;
  password: string;
}

/**
 * @param {string} message - mensaje del backend por cualquier ocurrencia
 * @param {string} user? - string nullable solo usado si el logueo es exitoso
 */
interface RegisterResponse {
  message: string;
  user?: string;
}

export async function registerUser(
  credentials: Credentials
): Promise<RegisterResponse> {
  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data: RegisterResponse = await response.json();

    if (!response.ok)
      throw new Error(data.message || "Error al iniciar session");

    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Error inesperado");
  }
}
