import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface PropiedadesEntrada extends TextInputProps {
  textoGuia?: string;
  estilo?: object;
}

const Entrada: React.FC<PropiedadesEntrada> = ({ textoGuia, estilo, ...props }) => {
  return (
    <TextInput
      placeholder={textoGuia}
      style={[styles.entrada, estilo]}
      placeholderTextColor="#6b7280" 
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  entrada: {
    backgroundColor: '#bfdbfe', 
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151', 
    marginBottom: 12,
  },
});

export default Entrada;
