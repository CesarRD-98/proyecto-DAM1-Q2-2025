// Boton.tsx - Versión corregida para React Native
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface PropiedadesBoton {
  children: React.ReactNode;
  alClic: () => void;
  estilo?: object;
}

const Boton: React.FC<PropiedadesBoton> = ({ children, alClic, estilo }) => {
  return (
    <TouchableOpacity
      onPress={alClic}
      style={[styles.boton, estilo]}
    >
      <Text style={styles.texto}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    width: '100%',
    backgroundColor: '#3b82f6', // bg-blue-500
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  texto: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Boton;