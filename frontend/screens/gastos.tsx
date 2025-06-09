import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ShoppingCart, Car, Film, Stethoscope, Utensils, X } from 'lucide-react-native';

interface Gasto {
  id: number;
  nombre: string;
  categoria: string;
  cantidad: string;
  IconoComponente: React.ElementType;
}

interface PropiedadesGastos {
  navegarA: (pantalla: string) => void;
}

const Gastos: React.FC<PropiedadesGastos> = ({ navegarA }) => {
  const gastos: Gasto[] = [
    { id: 1, nombre: "Supermercado la colonia", categoria: "Comida", cantidad: "500", IconoComponente: ShoppingCart },
    { id: 2, nombre: "Taxi", categoria: "Transporte", cantidad: "80", IconoComponente: Car },
    { id: 3, nombre: "Cine", categoria: "Entretenimiento", cantidad: "200", IconoComponente: Film },
    { id: 4, nombre: "Farmacia", categoria: "Salud", cantidad: "60", IconoComponente: Stethoscope },
    { id: 5, nombre: "Pizza Hut", categoria: "Restaurante", cantidad: "320", IconoComponente: Utensils }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => navegarA('inicio')} style={styles.closeButton}>
          <X size={24} color="#9CA3AF" /> {/* Gray-400 */}
        </TouchableOpacity>

        <Text style={styles.title}>Historial de gastos</Text>

        <ScrollView style={styles.list}>
          {gastos.map((gasto) => {
            const Icono = gasto.IconoComponente;
            return (
              <View key={gasto.id} style={styles.gastoItem}>
                <View style={styles.iconContainer}>
                  <View style={styles.iconBox}>
                    <Icono size={20} color="#4B5563" /> {/* Gray-600 */}
                  </View>
                  <View>
                    <Text style={styles.nombre}>{gasto.nombre}</Text>
                    <Text style={styles.categoria}>{gasto.categoria}</Text>
                  </View>
                </View>
                <Text style={styles.cantidad}>-L. {gasto.cantidad}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // bg-gray-100
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3B82F6', // text-blue-500
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    maxHeight: 400,
  },
  gastoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#E5E7EB', // border-gray-200
    borderBottomWidth: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 48,
    height: 48,
    backgroundColor: '#F3F4F6', // bg-gray-100
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  nombre: {
    fontWeight: '500',
    color: '#1F2937', // text-gray-800
  },
  categoria: {
    fontSize: 12,
    color: '#6B7280', // text-gray-500
  },
  cantidad: {
    fontWeight: '600',
    color: '#EF4444', // text-red-500
  },
});

export default Gastos;
