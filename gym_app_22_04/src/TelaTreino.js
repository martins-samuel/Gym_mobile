import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

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

const TelaTreino = ({ nivel, treinosRealizados, setTreinosRealizados, setPaginaAtual }) => {
  const [dia, setDia] = useState(1);
  const [exercicioAtual, setExercicioAtual] = useState(0);
  const [tempoExecucao, setTempoExecucao] = useState(30); // Tempo de execução do exercício
  const [tempoDescanso, setTempoDescanso] = useState(15); // Tempo de descanso entre os exercícios
  const [timer, setTimer] = useState(null); // Controla o temporizador

  useEffect(() => {
    setExercicioAtual(0);
    setTempoExecucao(30);
    setTempoDescanso(15);
  }, [dia]);

  useEffect(() => {
    if (tempoExecucao > 0) {
      const interval = setInterval(() => {
        setTempoExecucao((prev) => prev - 1);
      }, 1000);

      setTimer(interval);

      return () => clearInterval(interval);
    } else {
      clearInterval(timer);
      // Inicia o descanso após o exercício
      setTempoDescanso(15);
    }
  }, [tempoExecucao]);

  const treinoDia = treinos[nivel][`dia${dia}`];

  useEffect(() => {
    if (tempoDescanso > 0 && tempoExecucao === 0) {
      const interval = setInterval(() => {
        setTempoDescanso((prev) => prev - 1);
      }, 1000);

      setTimer(interval);

      return () => clearInterval(interval);
    } else if (tempoDescanso === 0 && tempoExecucao === 0) {
      // Vai para o próximo exercício ou dia após o descanso
      if (exercicioAtual < treinoDia.length - 1) {
        setExercicioAtual(exercicioAtual + 1);
        setTempoExecucao(30); // Reinicia o tempo de execução
        setTempoDescanso(15); // Reinicia o tempo de descanso
      } else {
        if (dia < 5) {
          setDia(dia + 1);
          setExercicioAtual(0);
          setTempoExecucao(30);
          setTempoDescanso(15);
        } else {
          setTreinosRealizados([...treinosRealizados, dia]);
          alert('Você completou todos os dias de treino!');
        }
      }
    }
  }, [tempoDescanso, tempoExecucao]);

  const handleNextExercicio = () => {
    if (exercicioAtual < treinoDia.length - 1) {
      setExercicioAtual(exercicioAtual + 1);
      setTempoExecucao(30); // Reinicia o tempo de execução
      setTempoDescanso(15); // Reinicia o tempo de descanso
    } else {
      if (dia < 5) {
        setDia(dia + 1);
        setExercicioAtual(0);
        setTempoExecucao(30);
        setTempoDescanso(15);
      } else {
        setTreinosRealizados([...treinosRealizados, dia]);
        alert('Você completou todos os dias de treino!');
      }
    }
  };

  const handlePreviousExercicio = () => {
    if (exercicioAtual > 0) {
      setExercicioAtual(exercicioAtual - 1);
    } else {
      if (dia > 1) {
        setDia(dia - 1);
        setExercicioAtual(treinoDia.length - 1); // Vai para o último exercício do dia anterior
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Dia {dia} - Exercício {nivel.charAt(0).toUpperCase() + nivel.slice(1)}</Text>
      <Text style={styles.exercicio}>Exercício: {treinoDia[exercicioAtual]}</Text>
      
      <Text style={styles.timer}>
        {tempoExecucao > 0 ? `Tempo de Execução: ${tempoExecucao}s` : `Descanso: ${tempoDescanso}s`}
      </Text>

      <View style={styles.botoes}>
        <Button title="Exercício Anterior" onPress={handlePreviousExercicio} />
        <Button title="Próximo Exercício" onPress={handleNextExercicio} />
      </View>

      <Button title="Ver Calendário" onPress={() => setPaginaAtual('calendario')} />
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
  exercicio: {
    fontSize: 20,
    marginBottom: 20,
  },
  timer: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default TelaTreino;
