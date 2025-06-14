import { createContext } from "react";
import { UserModel } from "../models/userModel";
import { ResponseModel } from "../models/response";
import { GastosModel } from "../models/gastosModel";

interface AuthType {
    isAuthenticated: boolean
    isLoading: boolean
    presupuesto: number,
    usuario: UserModel | null,
    gastos: GastosModel[]
    login: (correo: string, contrasena: string) => Promise<ResponseModel>
    logout: () => void
    refreshUser: () => Promise<void>
}

export const AuthContext = createContext<AuthType | undefined>(undefined)