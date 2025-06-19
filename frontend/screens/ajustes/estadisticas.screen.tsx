import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { API_URL } from '../../services/api.url';
import { getToken } from '../../utils/tokenStorage';
import { categoriaIconMap } from '../../utils/categoriaIcon';
import { PieChart } from 'react-native-chart-kit';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authStackParamListAjustes } from '../../navigation/ajustesNavigator';
import { formatCurrency } from '../../utils/formatCurrency';

const screenWidth = Dimensions.get('window').width;
type Props = NativeStackScreenProps<authStackParamListAjustes, 'Estadisticas'>

const EstadisticasScreen = ({ navigation }: Props) => {
  const [desde, setDesde] = useState(new Date());
  const [hasta, setHasta] = useState(new Date());
  const [pickerMode, setPickerMode] = useState<'desde' | 'hasta' | null>(null);
  const [gastos, setGastos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets()

  const fetchEstadisticas = async () => {
    setLoading(true);
    try {
      const token = await getToken();

      const res = await fetch(
        `${API_URL}/estadisticas?desde=${formatFecha(desde)}&hasta=${formatFecha(hasta)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await res.json();
      if (json.success) {
        setGastos(json.data.gastos);
      }
    } catch (err) {
      console.error('Error al cargar estadísticas:', err);
    } finally {
      setLoading(false);
    }
  };

  const getColor = (index: number) => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
    return colors[index % colors.length];
  };

  const totalPorCategoria = gastos.map((g, i) => ({
    name: g.categoria,
    amount: parseFloat(g.total),
    color: getColor(i),
    legendFontColor: '#333',
    legendFontSize: 14,
  }));

  const formatFecha = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={28} color="#6B7280" />
      </TouchableOpacity>
      <View style={{ paddingBottom: insets.bottom }}>
        <View style={styles.header}>
          <Ionicons name='bar-chart-outline' size={20} />
          <Text style={styles.headerTitle}>Estadisticas</Text>
        </View>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>Filtrar por fechas</Text>

            <View style={styles.dateRow}>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setPickerMode('desde')}
              >
                <Text style={styles.dateText}>Desde: {formatFecha(desde)}</Text>
                <Ionicons name="calendar-outline" size={20} color="#333" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setPickerMode('hasta')}
              >
                <Text style={styles.dateText}>Hasta: {formatFecha(hasta)}</Text>
                <Ionicons name="calendar-outline" size={20} color="#333" />
              </TouchableOpacity>
            </View>

            <DateTimePickerModal
              isVisible={pickerMode !== null}
              mode="date"
              onConfirm={(date) => {
                if (pickerMode === 'desde') setDesde(date);
                if (pickerMode === 'hasta') setHasta(date);
                setPickerMode(null);
              }}
              onCancel={() => setPickerMode(null)}
              date={pickerMode === 'desde' ? desde : hasta}
            />

            <TouchableOpacity style={styles.button} onPress={fetchEstadisticas}>
              <Text style={styles.buttonText}>Aplicar Filtro</Text>
            </TouchableOpacity>

            {gastos.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Distribución de gastos</Text>
                <PieChart
                  data={totalPorCategoria}
                  width={screenWidth - 32}
                  height={220}
                  chartConfig={{
                    color: () => '#000',
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    decimalPlaces: 2,
                  }}
                  accessor="amount"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                />

                <Text style={styles.sectionTitle}>Detalle por categoría</Text>
                {gastos.map((g) => (
                  <View key={g.codigo_categoria} style={styles.gastoItem}>
                    <View style={styles.iconContainer}>
                      {categoriaIconMap[g.categoria] || categoriaIconMap['Otros']}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.descripcion}>{g.categoria}</Text>
                      <Text style={styles.categoria}>
                        {g.cantidad} gasto{g.cantidad !== 1 ? 's' : ''}
                      </Text>
                    </View>
                    <Text style={styles.total}>L. {formatCurrency(parseFloat(g.total))}</Text>
                  </View>
                ))}
              </>
            )}

            {gastos.length === 0 && !loading && (
              <Text style={styles.placeholder}>No hay datos para mostrar.</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EstadisticasScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 14,
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
    marginTop: 30,
    marginBottom: 22,
    gap: 6
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  gastoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#ddd',
  },
  descripcion: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoria: {
    fontSize: 14,
    color: '#666',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  placeholder: {
    fontStyle: 'italic',
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
  },
});
