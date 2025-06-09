import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import NavegadorPestanasInferior from './Navigation/BottomTabsNavigator';
import PantallaInicio from './screens/inicio';
import PantallaTransaccion from './screens/transaccion';
import PantallaAjustes from './screens/ajustes';
import PantallaHistorialGastos from './screens/gastos';

const App: React.FC = () => {
  const [pestanaActiva, setPestanaActiva] = useState<string>('transacciones');

  const renderizarPantalla = () => {
    switch (pestanaActiva) {
      case 'inicio':
        return <PantallaInicio />;
      case 'transacciones':
        return <PantallaTransaccion navegarA={setPestanaActiva} />;
      case 'historial':
        return <PantallaHistorialGastos navegarA={setPestanaActiva} />;
      case 'ajustes':
        return <PantallaAjustes navegarA={setPestanaActiva} />;
      default:
        return <PantallaInicio />;
    }
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.contenido}>{renderizarPantalla()}</View>
      <NavegadorPestanasInferior pestanaActiva={pestanaActiva} setPestanaActiva={setPestanaActiva} />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contenido: {
    flex: 1,
    overflow: 'hidden', 
  },
});

export default App;
