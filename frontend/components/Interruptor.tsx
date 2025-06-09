// Interruptor.tsx - Versión corregida
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

interface PropiedadesInterruptor {
  estadoActivado: boolean;
  alCambiar: () => void;
  estilo?: object;
}

const Interruptor: React.FC<PropiedadesInterruptor> = ({ estadoActivado, alCambiar, estilo }) => {
  return (
    <TouchableOpacity 
      onPress={alCambiar}
      style={[styles.contenedor, estadoActivado ? styles.activado : styles.desactivado, estilo]}
    >
      <View style={[styles.circulo, estadoActivado ? styles.circuloActivado : styles.circuloDesactivado]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    padding: 2,
  },
  activado: {
    backgroundColor: '#3b82f6', // blue-500
  },
  desactivado: {
    backgroundColor: '#e5e7eb', // gray-200
  },
  circulo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  circuloActivado: {
    alignSelf: 'flex-end',
  },
  circuloDesactivado: {
    alignSelf: 'flex-start',
  },
});

export default Interruptor;