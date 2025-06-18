import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authStackParamListAjustes } from '../../navigation/ajustesNavigator';
import { usePerfil } from '../../providers/perfilProvider';

type Props = NativeStackScreenProps<authStackParamListAjustes, 'Contrasena'>;

const ContrasenaScreen = ({ navigation }: Props) => {
  const [actualPassword, setActualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { actualizarContrasena } = usePerfil();

  const handleActualizar = async () => {
    if (!actualPassword || !newPassword) {
      Alert.alert('Error', 'Debe ingresar ambas contraseñas.');
      return;
    }

    const exito = await actualizarContrasena(actualPassword, newPassword);
    if (exito) {
      Alert.alert('Éxito', 'Contraseña actualizada correctamente');
      setActualPassword('');
      setNewPassword('');
    } else {
      Alert.alert('Error', 'No se pudo actualizar la contraseña');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={28} color="#6B7280" />
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}
        >
          <Text style={styles.title}>Cambiar Contraseña</Text>

          <TextInput
            style={styles.input}
            placeholder="Contraseña actual"
            secureTextEntry
            value={actualPassword}
            onChangeText={setActualPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Nueva contraseña"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleActualizar}>
            <Text style={styles.buttonText}>Actualizar contraseña</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ContrasenaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    padding: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
