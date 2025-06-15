import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { useAuth } from '../../providers/authProvider'
import { Ionicons } from '@expo/vector-icons'
import { ActualizarPresupuesto } from '../../services/actualizarPresupuesto'

export default function PresupuestoScreen() {

  const [nombrePresupuesto, setNombrePresupuesto] = useState('')
  const [monto, setMonto] = useState('')
  const [notas, setNotas] = useState('')

  const { presupuesto, refreshUser } = useAuth()

  function limpiarCampos() {
    setNombrePresupuesto('')
    setMonto('')
    setNotas('')
  }

  function validarCampos(): boolean {
    const montoValidado = parseFloat(monto)
    if (!nombrePresupuesto.trim()) {
      Alert.alert('Alerta', 'El campo Titulo es obligatorio')
      return false
    }
    if (isNaN(montoValidado)) {
      Alert.alert('Alerta', 'El campo Monto es obligatorio')
      return false
    }
    if (montoValidado <= 0) {
      Alert.alert('Alerta', 'Ingrese un monto mayor a 0')
      return false
    }
    return true
  }

  const handlePresupuesto = async () => {
    if (!validarCampos()) return
    const montoParse = parseFloat(monto)
    const res = await ActualizarPresupuesto(nombrePresupuesto, montoParse, notas)
    if (res.success) {
      Alert.alert('Éxito', res.message)
    } else {
      Alert.alert('Error', res.message)
    }
    limpiarCampos()
    await refreshUser()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name='pie-chart-outline' size={20} />
        <Text style={styles.title}>Nuevo presupuesto</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Tu presupuesto actual</Text>
        <Text style={styles.amount}>L. {presupuesto.toFixed(2)}</Text>
      </View>

      <View>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Quincena de Enero"
          value={nombrePresupuesto}
          onChangeText={setNombrePresupuesto}
        />

        <Text style={styles.label}>Monto</Text>
        <TextInput
          style={styles.input}
          inputMode='decimal'
          keyboardType="numeric"
          placeholder="Ej. 500"
          value={monto}
          onChangeText={setMonto}
        />

        <Text style={styles.label}>Notas</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Notas adicionales..."
          multiline
          numberOfLines={4}
          textAlignVertical='top'
          value={notas}
          onChangeText={setNotas}
        />

        <TouchableOpacity style={styles.button} onPress={handlePresupuesto}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'center',
    gap: 6
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    alignItems: 'center'
  },
  subtitle: {
    fontSize: 14,
    color: '#CBD5E1',
    marginBottom: 4,
  },
  amount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34D399',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    fontSize: 14,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    color: '#111827',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  textarea: {
    height: 100,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#10B981',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
