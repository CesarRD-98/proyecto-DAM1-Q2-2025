import React, { useContext } from 'react'
import { InicioSesionContext } from '../context/inicioSesionContext'
import axios from 'axios'
import { saveToken } from '../utils/tokenStorage'

export default function InicioSesionProvider({children}: {children: React.ReactNode}) {

    const login = async (correo: string, contrasena: string): Promise<boolean> => {
        try {
            const response = await axios.post('http://192.168.0.5:5000/autenticacion', {correo, contrasena})

            if (response.status === 200) {
                const data = response.data.data
                // console.log(response.data.data.token);
                
                await saveToken(data.token)
                return true
            }
            return false
        } catch (error) {
            return false
        }
    }
  return (
    <InicioSesionContext.Provider value={{login}}>
        {children}
    </InicioSesionContext.Provider>
  )
}
export const useInicioSesionContext = () => {
    return useContext(InicioSesionContext)
}
