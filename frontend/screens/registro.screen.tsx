import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authStackParamList } from '../navigation/authStack';
import { isEmail } from '../utils/isEmail';
import { registroUsuario } from '../services/registroUsuario';

type Props = NativeStackScreenProps<authStackParamList, 'Registro'>

export default function RegistroScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassworod] = useState('');

  const handleRegister = async () => {
    const campos = [
      { label: 'Nombre', value: name },
      { label: 'Apellido', value: lastname },
      { label: 'Correo electrónico', value: email },
      { label: 'Contraseña', value: password }
    ]

    const campoVacio = campos.find(c => !c.value.trim())
    if (campoVacio) return Alert.alert('Alerta', `El campo ${campoVacio.label} es obligatorio`)
    if (!isEmail(email)) return Alert.alert('Alerta', 'Ingrese un correo válido')
    if (password.length < 8) return Alert.alert('Alerta', 'Su contraseña debe tener al menos 8 caracteres')

    const { success, message } = await registroUsuario(
      name,
      lastname,
      email,
      password
    )

    if (!success) return Alert.alert('Alerta', message)
    Alert.alert('Éxito', message)

    navigation.navigate('InicioSesion');
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={28} color="#6B7280" />
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >

            <Text style={styles.title}>Crea tu cuenta</Text>
            <Text style={styles.subtitle}>¡Bienvenido a MiPistoHN!</Text>

            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu primer nombre"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Apellido:</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu primer apellido"
              value={lastname}
              onChangeText={setLastname}
            />

            <Text style={styles.label}>Correo electrónico:</Text>
            <TextInput
              style={styles.input}
              placeholder="correo@ejemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa una contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassworod}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
              <Text style={styles.loginButtonText}>Registrarse</Text>
            </TouchableOpacity>

            <View style={styles.signupPrompt}>
              <Text style={styles.signupText}>¿Ya tienes una cuenta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('InicioSesion')}>
                <Text style={styles.signupLink}> Inicia Sesión</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container: {
    padding: 25,
    flexGrow: 1,
    backgroundColor: '#F3F4F6',
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 60,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
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
    padding: 14,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  loginButton: {
    backgroundColor: '#34D399',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupPrompt: {
    flexDirection: 'row',
    marginTop: 30,
  },
  signupText: {
    fontSize: 14,
    color: '#6B7280',
  },
  signupLink: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: 'bold',
  },
});