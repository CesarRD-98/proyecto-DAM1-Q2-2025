import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { authStackParamList } from '../navigation/authStack'
import { Ionicons } from '@expo/vector-icons'
import { isEmail } from '../utils/isEmail'
import { useAuth } from '../providers/authProvider'

type Props = NativeStackScreenProps<authStackParamList, 'InicioSesion'>
export default function InicioSesionScreen({ navigation }: Props) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, refreshUser } = useAuth()


  const handleLogin = async () => {
    if (!email.trim() && !password.trim()) {
      return Alert.alert('Error', 'Por favor, ingrese su email y contraseña.');
    }

    if (!isEmail(email)) return Alert.alert('Error', 'Ingrese un correo válido')

    const { success, message } = await login(email, password)

    if (!success) {
      Alert.alert('Error', `${message}`)
      return
    }
    await refreshUser()
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botón de volver */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={28} color="#6B7280" />
      </TouchableOpacity>

      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.subtitle}>¡Bienvenido de nuevo!</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="tuemail@ejemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Tú contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={() => Alert.alert('Recuperar Contraseña', 'Funcionalidad pendiente.')}
      >
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <View style={styles.signupPrompt}>
        <Text style={styles.signupText}>¿No tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.signupLink}> Regístrate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#F3F4F6',
    minHeight: Platform.OS === 'web' ? Dimensions.get('window').height : undefined,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 40 : 50,
    left: 20,
    zIndex: 1,
    padding: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 60,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
    fontWeight: '600',
    width: '100%',
    maxWidth: 400,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    maxWidth: 400,
    padding: 15,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    width: '100%',
    maxWidth: 400,
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  loginButton: {
    backgroundColor: '#34D399',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupPrompt: {
    flexDirection: 'row',
    marginTop: 30,
  },
  signupText: {
    fontSize: 16,
    color: '#6B7280',
  },
  signupLink: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: 'bold',
  },
});