import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { authStackParamListAjustes } from '../../navigation/ajustesNavigator'
import { useAuth } from '../../providers/authProvider'
import { Ionicons } from '@expo/vector-icons'

type Props = NativeStackScreenProps<authStackParamListAjustes, 'AjustesHome'>

export default function AjustesScreen({ navigation }: Props) {
  const { logout } = useAuth()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name='settings-outline' size={20} />
        <Text style={styles.headerTitle}>Ajustes</Text>
      </View>


      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuenta</Text>
        <OptionItem icon="person-outline" label="Perfil" onPress={() => navigation.navigate('Perfil')} />
        <OptionItem icon="lock-closed-outline" label="Cambiar contraseña" onPress={() => navigation.navigate('Contrasena')} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gastos</Text>
        <OptionItem icon="time-outline" label="Historial de gastos" onPress={() => navigation.navigate('Historial')} />
        <OptionItem icon="bar-chart-outline" label="Estadísticas" onPress={() => navigation.navigate('Estadisticas')} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sesión</Text>
        <OptionItem icon="exit-outline" label="Cerrar sesión" onPress={logout} danger />
      </View>
    </SafeAreaView>
  )
}

type OptionItemProps = {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  onPress: () => void
  danger?: boolean
}

const OptionItem = ({ icon, label, onPress, danger }: OptionItemProps) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <Ionicons name={icon} size={22} color={danger ? '#EF4444' : '#374151'} style={styles.optionIcon} />
    <Text style={[styles.optionText, danger && { color: '#EF4444' }]}>{label}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    gap: 4
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827'
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 10,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
})
