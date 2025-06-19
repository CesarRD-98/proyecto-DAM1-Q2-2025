import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
  Alert
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../providers/authProvider'
import { ChevronDown } from 'lucide-react-native'
import { Ionicons } from '@expo/vector-icons'
import { NuevoGasto } from '../../services/nuevoGasto'

export default function GastoScreen() {
  const { categorias, refreshUser } = useAuth()
  const [nombreGasto, setNombreGasto] = useState('')
  const [monto, setMonto] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<{ label: string; value: number } | null>(null)
  const [notas, setNotas] = useState('')
  const [modalVisible, setModalVisible] = useState(false)


  const seleccionarCategoria = (cat: any) => {
    setCategoriaSeleccionada({ label: cat.categoria, value: cat.codigo_categoria })
    setModalVisible(false)
  }

  function limpiarCampos() {
    setNombreGasto('')
    setMonto('')
    setCategoriaSeleccionada(null)
    setNotas('')
  }

  function validarCampos(): boolean {
    const montoParse = parseFloat(monto)
    if (!nombreGasto.trim()) {
      Alert.alert('Alerta', 'El campo Nombre es obligatorio')
      return false
    }
    if (isNaN(montoParse) || montoParse <= 0) {
      Alert.alert('Alerta', 'El campo Monto es obligatorio y debe ser mayor a L.0')
      return false
    }
    if (categoriaSeleccionada === null) {
      Alert.alert('Alerta', 'Seleccione una categoria')
      return false
    }
    return true
  }

  const handleGasto = async () => {
    if (!validarCampos()) return 

    const codigo: number = categoriaSeleccionada ? categoriaSeleccionada.value : 0
    const montoParse: number = parseFloat(monto)
    const res = await NuevoGasto(
      nombreGasto,
      codigo,
      montoParse,
      notas
    )

    if (res.success) {
      Alert.alert('Atención', res.message)
    } else {
      Alert.alert('Error', res.message)
    }
    limpiarCampos()
    await refreshUser()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Ionicons name='add-circle-outline' size={20} />
          <Text style={styles.headerTitle}>Nuevo gasto</Text>
        </View>

        <Text style={styles.label}>Nombre del gasto:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Café"
          value={nombreGasto}
          onChangeText={setNombreGasto}
        />

        <Text style={styles.label}>Monto:</Text>
        <TextInput
          style={styles.input}
          inputMode='decimal'
          keyboardType="numeric"
          placeholder="Ej. 200"
          value={monto}
          onChangeText={setMonto}
        />

        <Text style={styles.label}>Categoría:</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)}>
          <Text style={styles.dropdownText}>
            {categoriaSeleccionada ? categoriaSeleccionada.label : 'Seleccionar categoría'}
          </Text>
          <ChevronDown size={18} color="#6B7280" />
        </TouchableOpacity>

        <Text style={styles.label}>Notas:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Notas adicionales..."
          multiline
          numberOfLines={4}
          value={notas}
          onChangeText={setNotas}
        />

        <TouchableOpacity style={styles.button} onPress={handleGasto}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>


        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <FlatList
                data={categorias}
                keyExtractor={(item) => item.codigo_categoria.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => seleccionarCategoria(item)}
                  >
                    <Text style={styles.modalText}>{item.categoria}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
                <Text style={styles.modalCloseText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    gap: 6
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827'
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
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
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  dropdownText: {
    color: '#6B7280',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#10B981',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
  },
  modalItem: {
    paddingVertical: 16,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  modalText: {
    fontSize: 14,
    color: '#111827',
  },
  modalClose: {
    marginTop: 12,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#BA3211',
    fontWeight: '600',
    fontSize: 16,
  },
})
