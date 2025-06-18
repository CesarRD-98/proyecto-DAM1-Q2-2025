import React, { createContext, useContext } from 'react';
import { API_URL } from '../services/api.url';
import { getToken } from '../utils/tokenStorage';

interface PerfilContextProps {
  actualizarNombre: (primer_nombre: string, primer_apellido: string) => Promise<boolean>;
  actualizarContrasena: (actual: string, nueva: string) => Promise<boolean>;
  actualizarFoto: (imagenUri: string) => Promise<boolean>;
}

const PerfilContext = createContext<PerfilContextProps>({
  actualizarNombre: async () => false,
  actualizarContrasena: async () => false,
  actualizarFoto: async () => false,
});

export const PerfilProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const actualizarNombre = async (primer_nombre: string, primer_apellido: string): Promise<boolean> => {
    try {
      const token = await getToken();
      await fetch(`${API_URL}/perfil-nombre`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ primer_nombre, primer_apellido }),
      });
      return true;
    } catch (error) {
      console.error('Error al actualizar nombre:', error);
      return false;
    }
  };

  const actualizarContrasena = async (actual: string, nueva: string): Promise<boolean> => {
    try {
      const token = await getToken();
      await fetch(`${API_URL}/perfil-contrasena`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          actual_contrasena: actual,
          nueva_contrasena: nueva,
        }),
      });
      return true;
    } catch (error) {
      console.error('Error al actualizar contraseña:', error);
      return false;
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

      const res = await fetch(`${API_URL}/perfil-imagen/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      return res.ok;
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
