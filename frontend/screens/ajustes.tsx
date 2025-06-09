import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Tarjeta from '../components/Tarjeta';
import Interruptor from '../components/Interruptor';
import Boton from '../components/Boton';

interface PropiedadesPantallaAjustes {
  navegarA: (pantalla: string) => void;
}

const PantallaAjustes: React.FC<PropiedadesPantallaAjustes> = ({ navegarA }) => {
  const [notificacionesActivadas, setNotificacionesActivadas] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <Tarjeta>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Ajustes</Text>

          {/* Sección Cuenta */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cuenta</Text>
            <View style={styles.cardGroup}>
              <TouchableOpacity onPress={() => console.log('Ir a Perfil')} style={styles.cardItem}>
                <Text style={styles.itemText}>Perfil</Text>
                <ChevronRight size={20} color="#9CA3AF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Cambiar contraseña')} style={styles.cardItem}>
                <Text style={styles.itemText}>Cambiar contraseña</Text>
                <ChevronRight size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sección Transacciones */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Transacciones</Text>
            <TouchableOpacity onPress={() => navegarA('historial')} style={styles.roundedItem}>
              <Text style={styles.itemText}>Historial</Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Sección Notificaciones */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notificaciones</Text>
            <View style={styles.roundedItem}>
              <Text style={styles.itemText}>Notificaciones</Text>
              <Interruptor
                estadoActivado={notificacionesActivadas}
                alCambiar={() => setNotificacionesActivadas(!notificacionesActivadas)}
              />
            </View>
          </View>

          <Boton
  alClic={() => console.log('Cerrar sesión')}
  estilo={{ backgroundColor: '#f87171' }} // bg-red-400
>
  Cerrar sesión
</Boton>

        </ScrollView>
      </Tarjeta>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // bg-gray-100
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3B82F6', // text-blue-500
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#60A5FA', // text-blue-400
    marginBottom: 12,
  },
  cardGroup: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DBEAFE', // border-blue-100
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#EFF6FF', // bg-blue-50
    borderBottomWidth: 1,
    borderBottomColor: '#DBEAFE',
  },
  roundedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
  },
  itemText: {
    color: '#374151', 
  },
});

export default PantallaAjustes;
