import axios from "axios"
import { getToken } from "../utils/tokenStorage"
import { API_URL } from "./api.url"
import { ResponseModel } from "../models/response"

export const ActualizarPresupuesto = async (
    nombre_presupuesto: string,
    monto: number,
    notas: string
): Promise<ResponseModel> => {
    try {
        const token = await getToken()
        const res = await axios.put(`${API_URL}/perfil-presupuesto`, {
            monto,
            nombre_presupuesto,
            notas
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        })

        if (res.status === 200) {
            const { success, message } = res.data
            return {success, message}
        }

        return { success: false, message: 'No se logró actualizar el presupuesto' }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 400) {
                    return { success: false, message: 'Monto inválido' }
                } else if (error.response.status === 401) {
                    return { success: false, message: 'Sesión expirada' }
                } else {
                    return {success: false, message: 'Error desconocido'}
                }
            }
        }
        return { success: false, message: 'No hubo respuesta del servidor' }
    }
}