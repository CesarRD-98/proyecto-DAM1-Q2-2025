import axios from "axios"
import { API_URL } from "./api.url"
import { ResponseModel } from "../models/response"

export const registroUsuario = async (
    primer_nombre: string,
    primer_apellido: string,
    correo: string,
    contrasena: string
): Promise<ResponseModel> => {
    try {
        const response = await axios.post(`${API_URL}/registro`, {
            primer_nombre,
            primer_apellido,
            correo,
            contrasena
        })

        if (response.status === 200) {
            const { success, message } = response.data
            return { success, message }
        }

        return { success: false, message: 'No se logró finalizar el registro' }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 409) {
                    return { success: false, message: 'El correo ya está registrado' }
                }
            }
        }
        return { success: false, message: 'No hubo respuesta del servidor' }
    }
}
