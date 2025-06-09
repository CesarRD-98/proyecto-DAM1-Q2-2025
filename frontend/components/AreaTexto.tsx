import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface PropiedadesAreaTexto extends TextInputProps {
  textoGuia?: string;
  estilo?: object;
}

const AreaTexto: React.FC<PropiedadesAreaTexto> = ({ textoGuia, estilo, ...props }) => {
  return (
    <TextInput
      placeholder={textoGuia}
      style={[styles.areaTexto, estilo]}
      multiline
      numberOfLines={4}
      textAlignVertical="top"
      placeholderTextColor="#6b7280"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  areaTexto: {
    backgroundColor: '#bfdbfe',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
    minHeight: 100,
  },
});

export default AreaTexto;
