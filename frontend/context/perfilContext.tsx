import { createContext } from "react";
import { UserModel } from "../models/userModel";
import { GastosModel } from "../models/gastosModel";

export interface PerfilType {
    presupuesto: number,
    userPerfil: UserModel | null,
    gastos: GastosModel | null
}

export const PerfilContext = createContext<PerfilType>({
    presupuesto: 0,
    userPerfil: null,
    gastos: null
})
