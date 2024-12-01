import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Link } from "expo-router";

const Login = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [isStartEnabled, setIsStartEnabled] = useState(false);

  const handleInputChange = (name, value) => {
    if (name === "player1") setPlayer1(value);
    if (name === "player2") setPlayer2(value);

    // Enable the Start button only if both fields are non-blank
    setIsStartEnabled(
      value.trim() !== "" && player1.trim() !== "" && player2.trim() !== ""
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/tictactoe.jpg")}
          style={styles.imageBackground}
        >
          <View style={styles.card}>
            <Text style={styles.text}>Tic Tac Attack</Text>
            <TextInput
              style={styles.input}
              value={player1}
              onChangeText={(text) => handleInputChange("player1", text)}
              placeholder="Enter Player 1"
              placeholderTextColor="#aaa"
              returnKeyType="done"
            />
            <TextInput
              style={styles.input}
              value={player2}
              onChangeText={(text) => handleInputChange("player2", text)}
              placeholder="Enter Player 2"
              placeholderTextColor="#aaa"
              returnKeyType="done"
            />

            <Link
              href={`/home?player1=${player1}&player2=${player2}&music=eighties&color=1FB0B6`}
              style={[styles.button, !isStartEnabled && styles.disabledButton]}
              disabled={!isStartEnabled}
            >
              <Text style={styles.buttonText}>Start</Text>
            </Link>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  imageBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    width: "60%",
    padding: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  text: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: "80%",
    marginTop: 10,
    backgroundColor: "white",
    fontSize: 16,
    color: "black",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#b0c4de",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
