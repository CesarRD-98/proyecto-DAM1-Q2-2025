import { Dimensions, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome } from '@expo/vector-icons';
import { authStackParamList } from '../navigation/authStack';

type Props = NativeStackScreenProps<authStackParamList, 'Bienvenida'>;

export default function BienvenidaScreen({navigation}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <FontAwesome name="money" size={70} color="#34D399" />
      <Text style={styles.logoText}>MiPistoHN</Text>

      <Text style={styles.tagline}>
        Administra tus finanzas fácilmente y sin complicaciones.
      </Text>

      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={() => navigation.navigate('Registro')}
      >
        <Text style={styles.buttonText}>Regístrate</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('InicioSesion')}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          Iniciar Sesión
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    minHeight: Platform.OS === 'web' ? Dimensions.get('window').height : undefined,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#34D399',
    marginBottom: 10,
    letterSpacing: -1,
    fontFamily: Platform.OS === 'web' ? 'Arial, sans-serif' : 'System',
  },
  tagline: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 50,
    color: '#6B7280',
    lineHeight: 24,
  },
  button: {
    width: '80%',
    maxWidth: 300,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: '#34D399',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#34D399',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#34D399',
  },
});