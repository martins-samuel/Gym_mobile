import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TelaCalendario = ({ treinosRealizados, setPaginaAtual }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calendário de Treinos</Text>
      <View style={styles.calendario}>
        {Array.from({ length: 5 }, (_, i) => (
          <View key={i} style={[styles.dia, treinosRealizados.includes(i + 1) && styles.diaCompleto]}>
            <Text>{`Dia ${i + 1}`}</Text>
          </View>
        ))}
      </View>
      <Button title="Voltar ao Treino" onPress={() => setPaginaAtual('treino')} />
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  calendario: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  dia: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
  },
  diaCompleto: {
    backgroundColor: '#90ee90', // Verde claro para indicar completado
  },
});

export default TelaCalendario;
