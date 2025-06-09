import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Home, Receipt, Wallet, Settings } from 'lucide-react-native'; // librería React Native para lucide

interface PropiedadesNavegadorPestanasInferior {
  pestanaActiva: string;
  setPestanaActiva: (pestana: string) => void;
}

interface ElementoPestana {
  id: string;
  etiqueta: string;
  IconoComponente: React.ElementType;
}

const NavegadorPestanasInferior: React.FC<PropiedadesNavegadorPestanasInferior> = ({ pestanaActiva, setPestanaActiva }) => {
  const pestanas: ElementoPestana[] = [
    { id: 'inicio', etiqueta: 'Inicio', IconoComponente: Home },
    { id: 'transacciones', etiqueta: 'Transacciones', IconoComponente: Receipt },
    { id: 'historial', etiqueta: 'Historial', IconoComponente: Wallet },
    { id: 'ajustes', etiqueta: 'Ajustes', IconoComponente: Settings }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.pestanasContainer}>
        {pestanas.map((pestana) => {
          const Icono = pestana.IconoComponente;
          const activo = pestanaActiva === pestana.id;
          return (
            <TouchableOpacity
              key={pestana.id}
              onPress={() => setPestanaActiva(pestana.id)}
              style={[styles.pestana, activo ? styles.activo : styles.inactivo]}
            >
              <Icono size={24} color={activo ? '#3b82f6' : '#9ca3af'} style={{ marginBottom: 4 }} />
              <Text style={[styles.etiqueta, activo ? styles.textoActivo : styles.textoInactivo]}>
                {pestana.etiqueta}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.indicadorContainer}>
        <View style={styles.indicador} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  pestanasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  pestana: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10
  },
  activo: {
    backgroundColor: '#eff6ff',
  },
  inactivo: {},
  etiqueta: {
    fontSize: 12,
    fontWeight: '500',
  },
  textoActivo: {
    color: '#3b82f6',
  },
  textoInactivo: {
    color: '#9ca3af',
  },
  indicadorContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  indicador: {
    width: 128,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 9999,
  },
});

export default NavegadorPestanasInferior;
