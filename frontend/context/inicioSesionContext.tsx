import { createContext } from "react";

export const InicioSesionContext = createContext({
    login: async (correo: string, contrasena: string) => false
})
