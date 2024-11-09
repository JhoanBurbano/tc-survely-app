import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useNavigationApp } from '../hooks/useNavigation';

const CompletionScreen = () => {
  const navigation = useNavigationApp('Completion');

  return (
    <View style={styles.container}>
      <Text style={styles.thankYouText}>
        ¡Gracias por completar la encuesta!
      </Text>
      <Button
        title="Iniciar Nueva Encuesta"
        onPress={() => navigation.navigate('Survey')}
      />
      <Button
        title="Finalizar"
        onPress={() => navigation.navigate('Welcome')}
        color="#d9534f"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003670',
  },
  thankYouText: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default CompletionScreen;
