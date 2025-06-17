import React, { useContext, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GastosContext } from '../../providers/gastosProvider';
import { categoriaIconMap } from '../../utils/categoriaIcon';
import { useFocusEffect } from '@react-navigation/native';

const HistorialScreen = () => {
  const { gastos, loading, fetchGastos } = useContext(GastosContext);

  useFocusEffect(
    useCallback(() => {
      fetchGastos(); // 🔁 Se ejecuta cada vez que entra a la pantalla
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.gastos}>
          <Text style={styles.sectionTitle}>Historial de gastos</Text>

          {loading ? (
            <Text style={styles.descripcion}>Cargando...</Text>
          ) : gastos.length > 0 ? (
            gastos.map((t) => (
              <View key={t.id_gasto} style={styles.gastoItem}>
                <View style={styles.iconContainer}>
                  {categoriaIconMap[t.categoria] || categoriaIconMap["Otros"]}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.descripcion}>{t.nombre_gasto}</Text>
                  <Text style={styles.categoria}>{t.categoria}</Text>
                </View>
                <Text style={[styles.monto, styles.expenseText]}>
                  - L. {Math.abs(parseFloat(t.monto)).toFixed(2)}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.descripcion}>No tienes registros</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistorialScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  gastos: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  gastoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#ddd',
  },
  descripcion: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoria: {
    fontSize: 14,
    color: '#666',
  },
  monto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseText: {
    color: 'red',
  },
});
