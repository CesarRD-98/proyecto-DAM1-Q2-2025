import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface PropiedadesTarjeta {
  children: React.ReactNode;
  estiloExtra?: ViewStyle | ViewStyle[];
}

const Tarjeta: React.FC<PropiedadesTarjeta> = ({ children, estiloExtra }) => {
  return (
    <View style={[styles.tarjeta, estiloExtra]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default Tarjeta;
