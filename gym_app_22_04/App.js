import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TelaTreino from './src/TelaTreino';
import TelaCalendario from './src/TelaCalendario';

const App = () => {
  const [nivel, setNivel] = useState(null);
  const [treinosRealizados, setTreinosRealizados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState('treino'); // Controla a página exibida

  const handleNivelSelect = (selectedNivel) => {
    setNivel(selectedNivel);
    setPaginaAtual('treino');
  };

  return (
    <View style={styles.container}>
      {!nivel ? (
        <View style={styles.nivelSelect}>
          <Button title="Iniciante" onPress={() => handleNivelSelect('iniciante')} />
          <Button title="Intermediário" onPress={() => handleNivelSelect('intermediario')} />
          <Button title="Avançado" onPress={() => handleNivelSelect('avancado')} />
        </View>
      ) : (
        <>
          {paginaAtual === 'treino' ? (
            <TelaTreino
              nivel={nivel}
              treinosRealizados={treinosRealizados}
              setTreinosRealizados={setTreinosRealizados}
              setPaginaAtual={setPaginaAtual}
            />
          ) : (
            <TelaCalendario
              treinosRealizados={treinosRealizados}
              setPaginaAtual={setPaginaAtual}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  nivelSelect: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default App;
