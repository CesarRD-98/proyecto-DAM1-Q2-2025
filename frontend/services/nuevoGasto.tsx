import axios from "axios"
import { API_URL } from "./api.url"
import { getToken } from "../utils/tokenStorage"
import { ResponseModel } from "../models/response"

export const NuevoGasto = async (
    nombre_gasto: string,
    codigo_categoria: number,
    monto: number,
    notas: string
): Promise<ResponseModel> => {
    try {
        const token = await getToken()
        const res = await axios.post(`${API_URL}/gasto`, {
            nombre_gasto,
            codigo_categoria,
            monto,
            notas
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        })

        if (res.status === 200) {
            const { success, message, data } = res.data

            if (data.superado) {
                return { success, message: 'Has superado tu actual presupuesto' }
            } else {
                return { success, message }
            }
        }
        return { success: false, message: 'No se logro guardar el gasto' }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 400) {
                    return { success: false, message: 'Monto inválido' }
                } else if (error.response.status === 401) {
                    return { success: false, message: 'Sesión expirada' }
                } else {
                    return { success: false, message: 'Error desconocido' }
                }
            }
        }
        return { success: false, message: 'No hubo respuesta del servidor' }
    }
}