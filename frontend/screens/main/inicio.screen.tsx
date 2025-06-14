import { View, Text, ScrollView, Image, StyleSheet, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useAuth } from '../../providers/authProvider'
import { categoriaIconMap } from '../../utils/categoriaIcon'

export default function InicioScreen() {
  const { presupuesto, usuario, gastos } = useAuth()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: usuario?.imagen_perfil }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.greeting}>Bienvenido</Text>
              <Text style={styles.userName}>{usuario?.primer_nombre} {usuario?.segundo_nombre}</Text>
            </View>
          </View>
        </View>

        {/* Presupuesto actual */}
        <View style={styles.budgetCard}>
          <Text style={styles.budgetTitle}>Tu presupuesto actual</Text>
          <Text style={styles.budgetAmount}>L. {presupuesto.toFixed(2)}</Text>
        </View>

        {/* Últimos gastos */}
        <View style={styles.gastos}>
          <Text style={styles.sectionTitle}>Últimos gastos</Text>
          {gastos.map((t) => (
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
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scroll: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80
  },

  // Header
  header: {
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 12,
    borderColor: '#E5E7EB',
    borderWidth: 1
  },
  greeting: {
    fontSize: 14,
    color: '#6B7280'
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937'
  },

  // Card de presupuesto
  budgetCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4
  },
  budgetTitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 6
  },
  budgetAmount: {
    fontSize: 36,
    color: '#34D399',
    fontWeight: 'bold'
  },

  // Lista de gastos
  gastos: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111827'
  },
  gastoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  descripcion: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500'
  },
  categoria: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2
  },
  monto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseText: {
    color: '#EF4444'
  }
})
