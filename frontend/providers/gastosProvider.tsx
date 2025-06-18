import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/api.url'
import { getToken } from '../utils/tokenStorage';
import { GastosModel } from '../models/gastosModel';

interface GastosContextProps {
  gastos: GastosModel[];
  loading: boolean;
  fetchGastos: () => void;
}

export const GastosContext = createContext<GastosContextProps>({
  gastos: [],
  loading: false,
  fetchGastos: () => { },
});

export const GastosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gastos, setGastos] = useState<GastosModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchGastos = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) return
      const response = await axios.get(`${API_URL}/gastos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setGastos(response.data.data.gastos);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            console.warn('Sesion expirada');
            return
          }
          if (error.response.status === 500) {
            console.warn('No hubo respuesta del servidro')
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGastos();
  }, []);

  return (
    <GastosContext.Provider value={{ gastos, loading, fetchGastos }}>
      {children}
    </GastosContext.Provider>
  );
};
