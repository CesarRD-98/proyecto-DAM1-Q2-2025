import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Home, Receipt, Wallet, Settings } from 'lucide-react-native';

type PestanaID = 'inicio' | 'transacciones' | 'historial' | 'ajustes';

interface PropiedadesNavegadorPestanasInferior {
  pestanaActiva: PestanaID;
  setPestanaActiva: (pestana: PestanaID) => void;
}

interface ElementoPestana {
  id: PestanaID;
  etiqueta: string;
  IconoComponente: React.ElementType;
}

const NavegadorPestanasInferior: React.FC<PropiedadesNavegadorPestanasInferior> = ({ 
  pestanaActiva, 
  setPestanaActiva 
}) => {
  const { width } = Dimensions.get('window');
  const tabWidth = width / 4;
  
  const pestanas: ElementoPestana[] = [
    { id: 'inicio', etiqueta: 'Inicio', IconoComponente: Home },
    { id: 'transacciones', etiqueta: 'Transacciones', IconoComponente: Receipt },
    { id: 'historial', etiqueta: 'Historial', IconoComponente: Wallet },
    { id: 'ajustes', etiqueta: 'Ajustes', IconoComponente: Settings }
  ];

  const activeIndex = pestanas.findIndex(tab => tab.id === pestanaActiva);
  const indicatorPosition = activeIndex * tabWidth + (tabWidth / 2) - 64;

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
              style={[styles.pestana, activo && styles.activo]}
              accessibilityRole="button"
              accessibilityLabel={pestana.etiqueta}
              accessibilityState={{ selected: activo }}
            >
              <Icono 
                size={24} 
                color={activo ? '#3b82f6' : '#9ca3af'} 
                style={styles.icono} 
              />
              <Text style={[styles.etiqueta, activo && styles.textoActivo]}>
                {pestana.etiqueta}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      <View style={[styles.indicadorContainer, { left: indicatorPosition }]}>
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
    paddingTop: 8,
    paddingBottom: 4,
  },
  pestanasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pestana: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  activo: {
    backgroundColor: '#eff6ff',
  },
  icono: {
    marginBottom: 4,
  },
  etiqueta: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9ca3af',
  },
  textoActivo: {
    color: '#3b82f6',
  },
  indicadorContainer: {
    position: 'absolute',
    bottom: 0,
    width: 128,
    alignItems: 'center',
  },
  indicador: {
    width: 64,
    height: 3,
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
});

export default NavegadorPestanasInferior;