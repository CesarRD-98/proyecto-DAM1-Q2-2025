import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { deleteToken, getToken, saveToken } from '../utils/tokenStorage'
import axios from 'axios'
import { API_URL } from '../services/api.url'
import { UserModel } from '../models/userModel'
import { GastosModel } from '../models/gastosModel'
import { LoginResponse } from '../models/loginResponse'
import { CategoriasModel } from '../models/categoriasModel'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { formatCurrency } from '../utils/formatCurrency'

export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const [usuario, setUsuario] = useState<UserModel | null>(null)
    const [presupuesto, setPresupuesto] = useState('')
    const [gastos, setGastos] = useState<GastosModel[]>([])
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [categorias, setCategorias] = useState<CategoriasModel[]>([])

    const validateToken = async () => {
        const token = await getToken();

        if (!token) {
            setUsuario(null);
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
        }

        try {
            const resProfile = await axios.get(`${API_URL}/perfil`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            const { usuario, presupuesto, ultimos_gastos } = resProfile.data.data
            const resImg = await axios.get(`${API_URL}/perfil-imagen/${usuario.id_usuario}`)
            const resCat = await axios.get(`${API_URL}/categorias`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            const presupuestoFormateado = formatCurrency(parseFloat(presupuesto.monto))

            setCategorias(resCat.data.data)
            setPresupuesto(presupuestoFormateado)

            const fechaISO: string = presupuesto.fecha_registro
            const fechaFormateada: string = format(new Date(fechaISO), "d 'de' MMMM 'de' yyyy, h:mm a", { locale: es })
            setUsuario({
                id_usuario: usuario.id_usuario,
                primer_nombre: usuario.primer_nombre,
                primer_apellido: usuario.primer_apellido,
                correo_electronico: usuario.correo_electronico,
                imagen_perfil: resImg.data.url,
                fecha_presupuesto: fechaFormateada
            })
            setGastos(ultimos_gastos)
            setIsAuthenticated(true);
        } catch (err) {
            await deleteToken();
            setUsuario(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };


    const login = async (correo: string, contrasena: string): Promise<LoginResponse> => {

        try {
            const response = await axios.post(`${API_URL}/autenticacion`, { correo, contrasena })

            if (response.status === 200) {
                const { token } = response.data.data
                await saveToken(token)
                setIsAuthenticated(true)
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


    const logout = async () => {
        await deleteToken()
        setUsuario(null)
        setIsAuthenticated(false)
    }

    const refreshUser = async () => {
        await validateToken()
    }

    useEffect(() => {
        validateToken()
    }, [])



    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isLoading,
            presupuesto,
            usuario,
            gastos,
            categorias,
            login,
            logout,
            refreshUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth necesita de un provider AuthProvider')
    }
    return context
}
