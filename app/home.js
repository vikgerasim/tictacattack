import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/tictactoe.jpg')}
        style={styles.imageBackground}
      >
        <View style={styles.card}>
          <Text style={styles.text}>Tic Tac Attack</Text>
          <Link href="/game" style={styles.button}>
            <Text style={styles.buttonText}>Play Game</Text>
          </Link>
          <Link href="/settings" style={styles.button}>
            <Text style={styles.buttonText}>Settings</Text>
          </Link><Link href="/highscores" style={styles.button}>
            <Text style={styles.buttonText}>High Scores</Text>
          </Link>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 15,
    width: '60%',
    padding: 20,
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  text: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
