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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  const { actualizarNombre, actualizarFoto } = usePerfil();
  const { refreshUser, usuario } = useAuth();

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={28} color="#6B7280" />
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <Text style={styles.sectionTitle}>Foto de Perfil</Text>
          {usuario?.imagen_perfil ? (
            <Image
              source={{ uri: usuario.imagen_perfil }}
              style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 16 }}
            />
          ) : (
            <Text style={styles.placeholder}>No hay foto disponible</Text>
          )}

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

          <Text style={styles.sectionTitle}>Actualizar Foto</Text>
          {imagen && (
            <Image
              source={{ uri: imagen.uri }}
              style={{ width: 100, height: 100, marginBottom: 12, borderRadius: 50 }}
            />
          )}
          <TouchableOpacity style={styles.button} onPress={seleccionarImagen}>
            <Text style={styles.buttonText}>Seleccionar imagen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleActualizarFoto}>
            <Text style={styles.buttonText}>Subir imagen</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default PerfilScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 10,
    marginLeft: 10,
    marginTop: 10,
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
    borderRadius: 6,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
