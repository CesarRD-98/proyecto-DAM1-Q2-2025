import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authStackParamListAjustes } from '../../navigation/ajustesNavigator';
import { usePerfil } from '../../providers/perfilProvider';
import { useAuth } from '../../providers/authProvider';

type Props = NativeStackScreenProps<authStackParamListAjustes, 'Perfil'>;

const PerfilScreen = ({ navigation }: Props) => {
  const [primerNombre, setPrimerNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [imagen, setImagen] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisibleNames, setModalVisibleNames] = useState(false)

  const { actualizarNombre, actualizarFoto } = usePerfil();
  const { refreshUser, usuario } = useAuth();
  const insets = useSafeAreaInsets()

  const handleActualizarNombre = async () => {
    if (!primerNombre || !primerApellido) {
      Alert.alert('Error', 'Ingrese ambos nombres.');
      return;
    }

    const exito = await actualizarNombre(primerNombre, primerApellido);
    if (exito) {
      await refreshUser();
      Alert.alert('Éxito', 'Nombre actualizado correctamente');
      setPrimerNombre('');
      setPrimerApellido('');
    } else {
      Alert.alert('Error', 'No se pudo actualizar el nombre');
    }
  };

  const seleccionarImagen = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagen(resultado.assets[0]);
    }
  };

  const handleActualizarFoto = async () => {
    if (!imagen) {
      Alert.alert('Error', 'Seleccione una imagen');
      return;
    }

    const exito = await actualizarFoto(imagen.uri);
    if (exito) {
      await refreshUser();
      Alert.alert('Éxito', 'Imagen actualizada correctamente');
      setImagen(null);
    } else {
      Alert.alert('Error', 'No se pudo actualizar la imagen');
    }
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={28} color="#6B7280" />
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View style={{ paddingBottom: insets.bottom }}>
          <View style={styles.header}>
            <Ionicons name='person-outline' size={20} />
            <Text style={styles.headerTitle}>Perfil</Text>
          </View>
          <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={{ flex: 1, paddingHorizontal: 12 }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.sectionTitle}>Foto de Perfil</Text>
                {usuario?.imagen_perfil ? (
                  <Image
                    source={{ uri: usuario.imagen_perfil }}
                    style={styles.image}
                  />
                ) : (
                  <Text style={styles.placeholder}>No hay foto disponible</Text>
                )}
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Text style={styles.signupLink}>Actualizar imagen</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.divider} />
              <View style={{ flex: 1, width: '100%', flexDirection: 'row', gap: 10, alignItems: 'center', marginLeft: 20, paddingVertical: 10 }}>
                <Ionicons name='person-outline' size={24} />
                <View>
                  <Text style={{ fontSize: 16 }}>Nombre</Text>
                  <Text style={{ color: '#45556c' }}>{usuario?.primer_nombre} {usuario?.segundo_nombre}</Text>
                </View>
              </View>
              <View style={{ flex: 1, width: '100%', flexDirection: 'row', gap: 10, alignItems: 'center', marginLeft: 20, paddingVertical: 10 }}>
                <Ionicons name='mail-outline' size={24} />
                <View>
                  <Text style={{ fontSize: 16 }}>Correo</Text>
                  <Text style={{ color: '#45556c' }}>{usuario?.correo_electronico} </Text>
                </View>
              </View>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setModalVisibleNames(true)}>
                  <Text style={styles.signupLink}>Actualizar nombre</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.divider} />
              <View style={{ alignItems: 'center', marginTop: 30 }}>
                <TouchableOpacity style={styles.optionItem}>
                  <Ionicons name='close-outline' color={'#EF4444'} size={22} />
                  <Text style={styles.textDeleteOption}>Eliminar cuenta</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Modal visible={modalVisible} transparent animationType="fade">
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalText}>Actualizar Foto</Text>
                  {imagen && (
                    <>
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                          source={{ uri: imagen.uri }}
                          style={{ width: 150, height: 150, marginBottom: 12, borderRadius: 75 }}
                        />
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                          <TouchableOpacity style={[styles.button, styles.buttonPut]} onPress={handleActualizarFoto}>
                            <Text style={styles.buttonText}>Actualizar imagen</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={[styles.button, styles.buttonDelete]} onPress={() => setImagen(null)}>
                            <Text style={styles.buttonText}>Eliminar selección</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </>
                  )}
                  <TouchableOpacity style={styles.button} onPress={seleccionarImagen}>
                    <Text style={styles.buttonText}>Seleccionar imagen</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
                    <Text style={styles.modalCloseText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Modal visible={modalVisibleNames} transparent animationType="fade">
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  <Text style={styles.sectionTitle}>Actualizar Nombres</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Primer nombre"
                    value={primerNombre}
                    onChangeText={setPrimerNombre}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Primer apellido"
                    value={primerApellido}
                    onChangeText={setPrimerApellido}
                  />
                  <TouchableOpacity style={styles.button} onPress={handleActualizarNombre}>
                    <Text style={styles.buttonText}>Guardar nombres</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setModalVisibleNames(false)} style={styles.modalClose}>
                    <Text style={styles.modalCloseText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PerfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  placeholder: {
    fontStyle: 'italic',
    color: '#999',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonPut: {
    backgroundColor: '#34D399'
  },
  buttonDelete: {
    backgroundColor: '#BA3211'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signupLink: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: 'bold',
    marginVertical: 6
  },
  image: {
    width: 190,
    height: 190,
    borderRadius: 95,
    marginBottom: 18
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 10,
  },
  textDeleteOption: {
    color: '#EF4444'
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
    fontSize: 18,
    color: '#111827',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
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
  divider: {
    height: 1,
    backgroundColor: '#cad5e2',
    borderRadius: 2,
    marginVertical: 20
  }
});
