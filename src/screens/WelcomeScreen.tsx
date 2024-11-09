import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigationApp } from '../hooks/useNavigation';

const WelcomeScreen = () => {
  const navigation = useNavigationApp('Welcome');

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        ¡Bienvenido a la Encuesta de Teamcore!
      </Text>
      <Button
        title="Comenzar Encuesta"
        onPress={() => navigation.navigate('Survey')}
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
  welcomeText: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
