import { createContext } from "react";
import { LoginResponse } from "../models/loginResponse";

interface InicioSesionType {
    login: (correo: string, contrasena: string) => Promise<LoginResponse>
}

export const InicioSesionContext = createContext<InicioSesionType>({
    login: async () => ({success: false, status: 400, message: 'No definido'}),
})
