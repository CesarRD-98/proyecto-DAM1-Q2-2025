import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';
import Tarjeta from '../components/Tarjeta';
import Entrada from '../components/Entrada';
import AreaTexto from '../components/AreaTexto';
import Seccion from '../components/Seccion';
import Boton from '../components/Boton';

interface PropiedadesTransaccion {
  navegarA: (pantalla: string) => void;
}

const Transaccion: React.FC<PropiedadesTransaccion> = ({ navegarA }) => {
  const [nombreGasto, setNombreGasto] = useState('');
  const [monto, setMonto] = useState('');
  // Cambié el tipo para que acepte string o number y evitar error con Picker
  const [categoria, setCategoria] = useState<string | number>('');
  const [notas, setNotas] = useState('');

  const guardarTransaccion = () => {
    console.log({ nombreGasto, monto, categoria, notas });
    Alert.alert('Éxito', '¡Transacción guardada con éxito (simulado)!');
    setNombreGasto('');
    setMonto('');
    setCategoria('');
    setNotas('');
    navegarA('inicio');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Tarjeta>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navegarA('inicio')} style={styles.closeButton}>
            <X size={24} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <Text style={styles.titulo}>Transacciones</Text>
        <Text style={styles.subtitulo}>Registrar gasto</Text>

        <View style={styles.formulario}>
          <Entrada
            textoGuia="Nombre de gasto"
            value={nombreGasto}
            onChangeText={setNombreGasto}
          />
          <Entrada
            textoGuia="Monto"
            keyboardType="numeric"
            value={monto}
            onChangeText={setMonto}
          />
          <Seccion
            selectedValue={categoria}
            onValueChange={setCategoria}
            textoGuia="Categoría"
          >
            {/* Ejemplos de categorías */}
            <Seccion.Item label="Comida" value="comida" />
            <Seccion.Item label="Transporte" value="transporte" />
            <Seccion.Item label="Salud" value="salud" />
            <Seccion.Item label="Entretenimiento" value="entretenimiento" />
          </Seccion>
          <AreaTexto
            textoGuia="Notas"
            value={notas}
            onChangeText={setNotas}
          />
        </View>

        <View style={styles.botonContenedor}>
          <Boton alClic={guardarTransaccion}>
            Guardar
          </Boton>
        </View>
      </Tarjeta>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f3f4f6', // bg-gray-100
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 24,
  },
  closeButton: {
    padding: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3b82f6', // text-blue-500
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '500',
    color: '#60a5fa', // text-blue-400
    marginBottom: 24,
  },
  formulario: {
    marginBottom: 32,
  },
  botonContenedor: {
    marginTop: 16,
  },
});

export default Transaccion;
