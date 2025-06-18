import { Dimensions, Text, StyleSheet, TouchableOpacity, Platform, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FontAwesome } from '@expo/vector-icons'
import { authStackParamList } from '../navigation/authStack'

type Props = NativeStackScreenProps<authStackParamList, 'Bienvenida'>

export default function BienvenidaScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="money" size={70} color="#fff" />
        <Text style={styles.logoText}>MiPistoHN</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.tagline}>
          Administra tus finanzas fácilmente y sin complicaciones.
        </Text>

        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('Registro')}
        >
          <Text style={styles.primaryButtonText}>Regístrate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('InicioSesion')}
        >
          <Text style={styles.secondaryButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    minHeight: Platform.OS === 'web' ? Dimensions.get('window').height : undefined,
  },
  header: {
    backgroundColor: '#34D399',
    height: '30%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    marginTop: 10,
    letterSpacing: -1,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 80
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
    color: '#626F81',
    marginBottom: 40,
    lineHeight: 26,
    fontWeight: '600',
  },
  button: {
    width: '100%',
    maxWidth: 300,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  primaryButton: {
    backgroundColor: '#34D399',
  },
  primaryButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#34D399',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#34D399',
    fontWeight: 'bold'
  },
})
