import React, { useContext, useCallback, useState, useEffect, useLayoutEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  ActivityIndicator
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { GastosContext } from '../../providers/gastosProvider'
import { categoriaIconMap } from '../../utils/categoriaIcon'
import { TabActions, useFocusEffect } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { authStackParamListAjustes } from '../../navigation/ajustesNavigator'
import { BottomTabBar } from '@react-navigation/bottom-tabs'

type Props = NativeStackScreenProps<authStackParamListAjustes, 'Historial'>

const HistorialScreen = ({ navigation }: Props) => {
  const { gastos, loading, fetchGastos } = useContext(GastosContext)
  const [loadingLocal, setLoadingLocal] = useState(true)

  useFocusEffect(
    useCallback(() => {
      fetchGastos()
    }, [])
  )

  useEffect(() => {
    const timer = setTimeout(() => setLoadingLocal(false), 1500);
    return () => clearTimeout(timer)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={28} color="#6B7280" />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Ionicons name='time-outline' size={20} />
          <Text style={styles.headerTitle}>Historial de gastos</Text>
        </View>

        <View style={styles.containerItems}>
          {loadingLocal || loading ? (
            <>
              <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#3B82F6' />
                <Text style={styles.loadingText}>Cargando historial...</Text>
              </View>
            </>
          ) : gastos.length === 0 ? (
            <Text style={styles.descripcion}>No tienes registros</Text>
          ) : (
            <FlatList
              data={gastos}
              keyExtractor={(item) => item.id_gasto.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.list}
              renderItem={({ item }) => (
                <View style={styles.gastoItem}>
                  <View style={styles.iconContainer}>
                    {categoriaIconMap[item.categoria] || categoriaIconMap['Otros']}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.descripcion}>{item.nombre_gasto}</Text>
                    <Text style={styles.categoria}>{item.categoria}</Text>
                  </View>
                  <Text style={styles.monto}>
                    - L. {parseFloat(item.monto).toFixed(2)}
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HistorialScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  containerItems: {
    paddingTop: 8,
    marginBottom: 32
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 28,
    gap: 6
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827'
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 40 : 50,
    left: 20,
    zIndex: 1,
    padding: 5,
  },
  loadingContainer: {
    paddingTop: 60,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280'
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 16,
    textAlign: 'center',
    color: '#1F2937',
  },
  list: {
    paddingHorizontal: 16,
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
    backgroundColor: '#E5E7EB',
  },
  descripcion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  categoria: {
    fontSize: 13,
    color: '#6B7280',
  },
  monto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF4444',
  },
})
