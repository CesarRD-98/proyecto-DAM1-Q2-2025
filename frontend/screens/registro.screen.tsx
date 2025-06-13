import { 
  View, 
  Text, 
  Alert,
  TouchableOpacity, 
  TextInput,
  StyleSheet,
  Platform
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authStackParamList } from '../navigation/authStack';

type Props = NativeStackScreenProps<authStackParamList, 'Registro'>

export default function RegistroScreen({navigation}: Props) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleRegister = () => {
    if (nombre && email && contrasena) {
      Alert.alert('Registro Exitoso (simulado)', `Nombre: ${nombre}`);
      navigation.navigate('InicioSesion');
    } else {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={28} color="#6B7280" />
      </TouchableOpacity>

      <Text style={styles.title}>Crea tu cuenta</Text>
      <Text style={styles.subtitle}>¡Bienvenido a MiPistoHN!</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Tu nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="correo@ejemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="••••••••"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
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