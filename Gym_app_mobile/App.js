import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView } from 'react-native';

const treinos = {
  iniciante: {
    dia1: ['Abdominal reto', 'Abdominal oblíquo', 'Abdominal infra', 'Abdominal com pernas elevadas', 'Abdominal com rotação'],
    dia2: ['Abdominal oblíquo', 'Abdominal infra', 'Abdominal com bola', 'Abdominal invertido', 'Abdominal lateral'],
    dia3: ['Abdominal completo', 'Abdominal com apoio', 'Abdominal com torção', 'Abdominal lateral', 'Abdominal reto'],
    dia4: ['Abdominal com apoio de pernas elevadas', 'Abdominal com bola', 'Abdominal com rotação', 'Abdominal completo', 'Abdominal com torção'],
    dia5: ['Abdominal oblíquo', 'Abdominal completo', 'Abdominal infra', 'Abdominal lateral', 'Abdominal reto'],
  },
  intermediario: {
    dia1: ['Abdominal reto', 'Abdominal com peso', 'Abdominal infra', 'Abdominal com pernas elevadas', 'Abdominal com torção'],
    dia2: ['Abdominal com rotação', 'Abdominal no banco', 'Abdominal oblíquo', 'Abdominal com bola', 'Abdominal invertido'],
    dia3: ['Abdominal completo', 'Abdominal com apoio', 'Abdominal com torção', 'Abdominal lateral', 'Abdominal com bola'],
    dia4: ['Abdominal completo com peso', 'Abdominal reto', 'Abdominal infra', 'Abdominal com apoio', 'Abdominal oblíquo'],
    dia5: ['Abdominal lateral', 'Abdominal invertido', 'Abdominal com torção', 'Abdominal com rotação', 'Abdominal no banco'],
  },
  avancado: {
    dia1: ['Abdominal reto com peso', 'Abdominal com bola', 'Abdominal com torção', 'Abdominal lateral', 'Abdominal com barra'],
    dia2: ['Abdominal completo com rotação', 'Abdominal com torção intensa', 'Abdominal oblíquo com bola', 'Abdominal lateral com peso', 'Abdominal com apoio'],
    dia3: ['Abdominal completo', 'Abdominal com apoio de pernas elevadas', 'Abdominal com torção intensa', 'Abdominal com rotação', 'Abdominal com barra'],
    dia4: ['Abdominal completo com rotação intensa', 'Abdominal com apoio de mãos', 'Abdominal lateral com barra', 'Abdominal com torção', 'Abdominal reto com peso'],
    dia5: ['Abdominal lateral com bola', 'Abdominal com barra', 'Abdominal reto', 'Abdominal com apoio de pernas elevadas', 'Abdominal com rotação'],
  },
};

const App = () => {
  const [nivel, setNivel] = useState(null);
  const [tempoExercicio, setTempoExercicio] = useState(30);
  const [tempoDescanso, setTempoDescanso] = useState(30);
  const [dia, setDia] = useState(1);
  const [treinosRealizados, setTreinosRealizados] = useState([]);
  const [timer, setTimer] = useState(30);
  const [emDescanso, setEmDescanso] = useState(false);

  const resetarTimer = useCallback(() => {
    setTimer(tempoExercicio);
    setEmDescanso(false);
  }, [tempoExercicio]);

  useEffect(() => {
    resetarTimer();
  }, [resetarTimer]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          if (emDescanso) {
            setEmDescanso(false);
            return tempoExercicio;
          } else {
            setEmDescanso(true);
            return tempoDescanso;
          }
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [emDescanso, tempoDescanso, tempoExercicio]);

  const handleNivelSelect = (selectedNivel) => {
    setNivel(selectedNivel);
    setDia(1);
  };

  const handleNextDay = () => {
    if (dia < 5) {
      setTreinosRealizados([...treinosRealizados, dia]);
      setDia(dia + 1);
    } else {
      setTreinosRealizados([...treinosRealizados, dia]);
      alert('Você completou todos os dias de treino!');
    }
  };

  const calcularCalorias = () => {
    const tempoTotalExercicio = tempoExercicio * 5;
    const tempoTotalDescanso = tempoDescanso * 5;
    const caloriasExercicio = tempoTotalExercicio * 5 / 60;
    const caloriasDescanso = tempoTotalDescanso * 2 / 60;
    return Math.round(caloriasExercicio + caloriasDescanso);
  };

  const renderTreino = () => {
    if (!nivel) return null;
    const treinoDia = treinos[nivel][`dia${dia}`];
    const caloriasQueimadas = calcularCalorias();

    return (
      <ScrollView style={styles.scrollView}>
        <Text style={styles.titulo}>Dia {dia} - Treino {nivel.charAt(0).toUpperCase() + nivel.slice(1)}</Text>
        {treinoDia.map((exercicio, index) => (
          <View key={index} style={styles.exercicioContainer}>
            <Text style={styles.exercicio}>{exercicio}</Text>
            <Text style={styles.tempos}>Tempo do Exercício: {tempoExercicio} segundos</Text>
            <Text style={styles.tempos}>Tempo de Descanso: {tempoDescanso} segundos</Text>
          </View>
        ))}
        <Text style={styles.calorias}>Estimativa de Calorias Queimadas: {caloriasQueimadas} calorias</Text>
        <Text style={styles.timer}>⏱️ Tempo: {timer}s ({emDescanso ? 'Descanso' : 'Exercício'})</Text>
        <Button title="Próximo Dia" onPress={handleNextDay} />
      </ScrollView>
    );
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
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Tempo de cada exercício (em segundos):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(tempoExercicio)}
              onChangeText={(text) => setTempoExercicio(Number(text))}
            />
            <Text style={styles.inputLabel}>Tempo de descanso (em segundos):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(tempoDescanso)}
              onChangeText={(text) => setTempoDescanso(Number(text))}
            />
          </View>
          {renderTreino()}
          <View style={styles.calendarioContainer}>
            <Text style={styles.calendarioTitulo}>Calendário de Treinos</Text>
            <View style={styles.calendario}>
              {Array.from({ length: 5 }, (_, i) => (
                <View key={i} style={[styles.dia, treinosRealizados.includes(i + 1) && styles.diaCompleto]}>
                  <Text>{`Dia ${i + 1}`}</Text>
                </View>
              ))}
            </View>
          </View>
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
  inputContainer: {
    marginBottom: 20,
    width: '80%',
    justifyContent: 'center',
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  scrollView: {
    marginTop: 20,
    width: '100%',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exercicioContainer: {
    marginBottom: 15,
  },
  exercicio: {
    fontSize: 18,
  },
  tempos: {
    fontSize: 16,
    color: '#555',
  },
  calorias: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  calendarioContainer: {
    marginTop: 20,
  },
  calendarioTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendario: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  dia: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  diaCompleto: {
    backgroundColor: '#4CAF50',
  },
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default App;