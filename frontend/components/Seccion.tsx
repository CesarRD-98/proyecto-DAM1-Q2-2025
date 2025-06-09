import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Svg, { Path } from 'react-native-svg';

interface PropiedadesSeleccion {
  selectedValue: string | number;
  onValueChange: (itemValue: string | number, itemIndex: number) => void;
  children: React.ReactNode;
  textoGuia?: string;
  estiloContenedor?: object;
  estiloPicker?: object;
}

const SeccionComponent: React.FC<PropiedadesSeleccion> = ({
  selectedValue,
  onValueChange,
  children,
  textoGuia,
  estiloContenedor,
  estiloPicker,
}) => {
  return (
    <View style={[styles.contenedor, estiloContenedor]}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={[styles.picker, estiloPicker]}
        dropdownIconColor="#374151"
      >
        {textoGuia && <Picker.Item label={textoGuia} value="" enabled={false} />}
        {children}
      </Picker>
      <View style={styles.icono}>
        <Svg width={16} height={16} viewBox="0 0 20 20" fill="currentColor">
          <Path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    position: 'relative',
    marginBottom: 12,
    backgroundColor: '#bfdbfe', // bg-blue-50
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    height: 48,
    color: '#4b5563', // text-gray-600
    paddingHorizontal: 16,
    paddingRight: 40, // espacio para icono
  },
  icono: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -8,
    pointerEvents: 'none',
  },
});

(SeccionComponent as any).Item = Picker.Item;

export default SeccionComponent as React.FC<PropiedadesSeleccion> & {
  Item: typeof Picker.Item;
};
