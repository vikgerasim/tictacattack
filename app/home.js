import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { Link, useLocalSearchParams } from 'expo-router';



const Home = () => {
  const { player1, player2, music, color } = useLocalSearchParams();
    return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/tictactoe.jpg')}
        style={styles.imageBackground}
      >
        <View style={styles.card}>
          <Text style={styles.text}>Tic Tac Attack</Text>
          <Text style={styles.playerText}>
            {player1} vs {player2}
          </Text>
          <Link href={`/game?playerXName=${player1}&playerOName=${player2}&music=${music}&color=${color}`} style={styles.button}>
            <Text style={styles.buttonText}>Play Game</Text>
          </Link>
          <Link href={`/settings?player1=${player1}&player2=${player2}&music=${music}&color=${color}`} style={styles.button}>
            <Text style={styles.buttonText}>Settings</Text>
          </Link><Link href={`/highscores?player1=${player1}&player2=${player2}&music=${music}&color=${color}`} style={styles.button}>
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
  playerText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
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
