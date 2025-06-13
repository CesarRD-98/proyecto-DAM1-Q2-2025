import { View, Text, ScrollView, Image, StyleSheet, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { AntDesign, Feather } from '@expo/vector-icons';

export default function InicioScreen() {
  const userName = 'Usuario Prueba';
  const currentBudget = 1250.00;
  const lastUpdatedDate = '10 de junio de 2024';

  const transactions = [
    { id: '1', type: 'income', description: 'Salario de Mayo', category: 'Salario', amount: 2500 },
    { id: '2', type: 'expense', description: 'Alquiler', category: 'Vivienda', amount: -800 },
    { id: '3', type: 'expense', description: 'Supermercado', category: 'Comida', amount: -150 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: 'https://via.placeholder.com/60/FFD700/000000?text=JP' }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.greeting}>Hola,</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
          </View>
          <Feather name="bell" size={24} color="#666" />
        </View>

        <View style={styles.budgetCard}>
          <Text style={styles.budgetTitle}>Tu presupuesto</Text>
          <Text style={styles.budgetAmount}>L. {currentBudget.toFixed(2)}</Text>
          <Text style={styles.budgetDate}>Última actualización: {lastUpdatedDate}</Text>
        </View>

        <View style={styles.transactions}>
          <Text style={styles.sectionTitle}>Últimos Gastos</Text>
          {transactions.map((t) => (
            <View key={t.id} style={styles.transactionItem}>
              <View
                style={[
                  styles.iconContainer,
                  t.type === 'income' ? styles.incomeBg : styles.expenseBg,
                ]}
              >
                <AntDesign
                  name={t.type === 'income' ? 'arrowup' : 'arrowdown'}
                  size={18}
                  color={t.type === 'income' ? '#34D399' : '#EF4444'}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.transactionDesc}>{t.description}</Text>
                <Text style={styles.transactionCategory}>{t.category}</Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  t.type === 'income' ? styles.incomeText : styles.expenseText,
                ]}
              >
                L. {Math.abs(t.amount).toFixed(2)}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280'
  },
  userName: {
    fontSize: 22, fontWeight: 'bold', color: '#1F2937'
  },

  budgetCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 30,
  },
  budgetTitle: {
    fontSize: 18,
    color: '#CBD5E0',
    marginBottom: 8
  },
  budgetAmount: {
    fontSize: 36,
    color: '#34D399',
    fontWeight: 'bold'
  },
  budgetDate: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 6
  },
  transactions: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  incomeBg: { backgroundColor: '#D1FAE5' },
  expenseBg: { backgroundColor: '#FEE2E2' },
  transactionDesc: { fontSize: 16, color: '#111827' },
  transactionCategory: { fontSize: 13, color: '#6B7280' },
  transactionAmount: { fontSize: 16, fontWeight: 'bold' },
  incomeText: { color: '#34D399' },
  expenseText: { color: '#EF4444' },
});