import axios from "axios"
import { API_URL } from "./api.url"
import { ResponseModel } from "../models/response"
import { getToken } from "../utils/tokenStorage"

export const eliminarCuenta = async (): Promise<ResponseModel> => {
     try {
        const token = await getToken()
        const res = await axios.delete(`${API_URL}/eliminar`, {
            headers: { 'Authorization': `Bearer ${token}`}
        })
        if(res.status === 200) {
            return {success: true, message: 'Cuenta eliminada exitosamente'}
        }
        return {success: false, message: 'Ocurrió un error al intentar eliminar la cuenta'}
     } catch (error) {
        return {success: false, message: 'No hubo respuesta del servidor'}
     }
}