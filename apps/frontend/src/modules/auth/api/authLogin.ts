/**
 * @param {string} email - envio del email del usuario
 * @param {string} password - envio de la password del usuario podria usar un union type para manejar el hash
 */
interface Credentials {
  email: string;
  password: string;
}

/**
 * @param {string} message - mensaje del backend por cualquier ocurrencia
 * @param {string} user? - string nullable solo usado si el logueo es exitoso
 */
export interface LoginResponse {
  message: string;
  user?: string;
  typeAccount?: number;
}

/**
 * @param {boolean} remember - este input checkbox permitira mandarle notificaciones al usuario de su actividad en la app
 */
interface Notifications {
  remember: boolean;
}

/**
 * @param {Credentials} credentials - credenciales a enviar al back
 */
export async function loginUser(
  credentials: Credentials,
  sendNotificactions?: Notifications
): Promise<LoginResponse> {
  if (sendNotificactions) {
    console.log("el usuario activo lo de mandar notificaciones al email");
  } else {
    console.log("el usuario no lo activo");
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data: LoginResponse = await response.json();

    if (!response.ok)
      throw new Error(data.message || "Error al iniciar session");

    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Error de red");
    }
    throw new Error("Error de red");
  }
}
