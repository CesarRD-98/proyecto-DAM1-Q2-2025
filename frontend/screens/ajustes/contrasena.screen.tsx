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
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authStackParamListAjustes } from '../../navigation/ajustesNavigator';
import { usePerfil } from '../../providers/perfilProvider';

type Props = NativeStackScreenProps<authStackParamListAjustes, 'Contrasena'>;

const ContrasenaScreen = ({ navigation }: Props) => {
  const [actualPassword, setActualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const { actualizarContrasena } = usePerfil();
  const insets = useSafeAreaInsets()

  const handleActualizar = async () => {
    if (!actualPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Debes completar todos los campos');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Alerta', 'La nueva contraseña no coincide con la confirmación')
      return
    }

    if (newPassword.length < 8) {
      Alert.alert('Alerta', 'La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }

    const { success, message } = await actualizarContrasena(actualPassword, newPassword);
    if (success) {
      Alert.alert('Éxito', message);
      setActualPassword('');
      setNewPassword('');
      setConfirmPassword('')
    } else {
      Alert.alert('Error', message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={28} color="#6B7280" />
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}
        >
          <View style={{ paddingBottom: insets.bottom }}>
            <View style={styles.header}>
              <Ionicons name='lock-closed-outline' size={20} />
              <Text style={styles.headerTitle}>Cambiar contraseña</Text>
            </View>

            <Text style={styles.label}>Contraseña actual:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su contraseña actual"
              secureTextEntry
              value={actualPassword}
              onChangeText={setActualPassword}
            />

            <Text style={styles.label}>Nueva contraseña:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su nueva contraseña"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <Text style={styles.label}>Confirmar nueva contraseña:</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirme su nueva contraseña"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleActualizar}>
              <Text style={styles.buttonText}>Actualizar contraseña</Text>
            </TouchableOpacity>
          </View>
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
    position: 'absolute',
    top: Platform.OS === 'web' ? 40 : 50,
    left: 20,
    zIndex: 1,
    padding: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 28,
    gap: 6
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
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
  button: {
    backgroundColor: '#10B981',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
