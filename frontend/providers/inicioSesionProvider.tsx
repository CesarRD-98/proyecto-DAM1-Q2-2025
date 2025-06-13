import React, { useContext } from 'react'
import { InicioSesionContext } from '../context/inicioSesionContext'
import axios from 'axios'
import { saveToken } from '../utils/tokenStorage'
import { LoginResponse } from '../models/loginResponse'
import { API_URL } from '../services/api.url'

export default function InicioSesionProvider({ children }: { children: React.ReactNode }) {

    const login = async (correo: string, contrasena: string): Promise<LoginResponse> => {
        try {
            const response = await axios.post(`${API_URL}/autenticacion`, { correo, contrasena })

            if (response.status === 200) {
                const { token } = response.data.data
                console.log(token);

                await saveToken(token)
                return { success: true, status: 200, message: 'Inicio de sesión exitoso' }
            }
            return { success: false, status: 400, message: 'Ocurrió un problema al iniciar sesión' }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 401) {
                        return { success: false, status: 401, message: 'Correo y/o contraseña incorrecta' }
                    } else if (error.response.status === 404) {
                        return { success: false, status: 404, message: 'Usuario no registrado' }
                    } else {
                        return { success: false, status: 400, message: 'Error desconocido' }
                    }
                }
            }
            return { success: false, status: 500, message: 'No hubo respuesta del servidor' }
        }
    }
    return (
        <InicioSesionContext.Provider value={{ login }}>
            {children}
        </InicioSesionContext.Provider>
    )
}
export const useInicioSesionContext = () => {
    return useContext(InicioSesionContext)
}
