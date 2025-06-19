import React, { createContext, useContext } from 'react';
import { API_URL } from '../services/api.url';
import { getToken } from '../utils/tokenStorage';
import axios from 'axios';
import { ResponseModel } from '../models/response';

interface PerfilContextProps {
  actualizarNombre: (primer_nombre: string, primer_apellido: string) => Promise<boolean>;
  actualizarContrasena: (actual: string, nueva: string) => Promise<ResponseModel>;
  actualizarFoto: (imagenUri: string) => Promise<boolean>;
}

const PerfilContext = createContext<PerfilContextProps>({
  actualizarNombre: async () => false,
  actualizarContrasena: async () => ({ success: true }),
  actualizarFoto: async () => false,
});

export const PerfilProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const actualizarNombre = async (primer_nombre: string, primer_apellido: string): Promise<boolean> => {
    try {
      const token = await getToken();
      await axios.put(`${API_URL}/perfil-nombre`, { primer_nombre, primer_apellido }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {
      console.error('Error al actualizar nombre:', error);
      return false;
    }
  };

  const actualizarContrasena = async (
    actual_contrasena: string,
    nueva_contrasena: string
  ): Promise<ResponseModel> => {
    try {
      const token = await getToken();
      await axios.put(`${API_URL}/perfil-contrasena`, { actual_contrasena, nueva_contrasena }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { success: true, message: 'Contraseñas actualizadas correctamente' }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            return { success: false, message: 'Contraseña actual no coincide' }
          }
        }
      }
      console.warn('Error al actualizar contraseña:', error);
      return { success: false, message: 'No hubo respuesta del servidor' };
    }
  };

  const actualizarFoto = async (imagenUri: string): Promise<boolean> => {
    try {
      const token = await getToken();
      const formData = new FormData();
      const ext = imagenUri.split('.').pop();

      formData.append('image', {
        uri: imagenUri,
        name: `foto_perfil.${ext}`,
        type: `image/${ext}`,
      } as any);


      const res = await axios.put(`${API_URL}/perfil-imagen`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return true;
    } catch (error) {
      console.error('Error al subir imagen:', error);
      return false;
    }
  };

  return (
    <PerfilContext.Provider value={{ actualizarNombre, actualizarContrasena, actualizarFoto }}>
      {children}
    </PerfilContext.Provider>
  );
};

export const usePerfil = () => useContext(PerfilContext);
