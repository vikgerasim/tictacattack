import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { addHighScore } from "./api";
import { Audio } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "react-native-vector-icons";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

const lineThickness = screenWidth / 25;
const lineWidth = screenWidth * 0.75;
const leftOffset = screenWidth * 0.125;
const cellSize = screenWidth / 4;
let shift = -1;
let gameOver = false;
let rotation = "0deg";

const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [startingPlayer, setStartingPlayer] = useState("X");
  const [moveCount, setMoveCount] = useState(0);
  const { playerXName, playerOName, music, color } = useLocalSearchParams();
  const [currentMusic, setCurrentMusic] = useState(`${music}`);
  const [draw, setDraw] = useState(false);
  const router = useRouter();


  const [grid, setGrid] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  // Score state
  const [scores, setScores] = useState({
    X: 0,
    O: 0,
  });

  const [sound, setSound] = React.useState();

  // Handle cell press
  const handlePress = (row, col) => {
    if (checkWinner(grid) || moveCount === 9) {
      resetGame();
      return;
    }

    // If the cell is already filled, return early
    if (grid[row][col] !== "") return;

    // Copy the grid and update the clicked cell
    const newGrid = [...grid];
    newGrid[row][col] = currentPlayer;

    // Update the state with the new grid and switch players
    setGrid(newGrid);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setMoveCount(moveCount + 1);
    // Check for a winning condition
    if (checkWinner(grid)) {
      updateScore(currentPlayer);

      playSound();

      //Alert.alert(`Player ${currentPlayer} wins!`);
      //resetGame();
    } else if (moveCount === 8) {
     //Alert.alert("It's a draw!");
      setDraw(true);
      //resetGame();
    }
  };

  // Check for a winning condition
  const checkWinner = (grid) => {
    // Check rows
    for (let row of grid) {
      shift++;
      if (row[0] !== "" && row[0] === row[1] && row[1] === row[2]) {
        gameOver = true;

        return true;
      }
    }
    shift = 3;

    // Check columns
    for (let col = 0; col < 3; col++) {
      shift--;
      if (
        grid[0][col] !== "" &&
        grid[0][col] === grid[1][col] &&
        grid[1][col] === grid[2][col]
      ) {
        gameOver = true;
        rotation = "90deg";
        return true;
      }
    }
    shift = 1;

    // Check diagonals
    if (
      grid[0][0] !== "" &&
      grid[0][0] === grid[1][1] &&
      grid[1][1] === grid[2][2]
    ) {
      gameOver = true;
      rotation = "45deg";
      return true;
    }
    if (
      grid[0][2] !== "" &&
      grid[0][2] === grid[1][1] &&
      grid[1][1] === grid[2][0]
    ) {
      gameOver = true;
      rotation = "135deg";
      return true;
    }
    shift = -1;
    return false;
  };

  // Reset the game
  const resetGame = () => {
    setGrid([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setStartingPlayer(startingPlayer === "X" ? "O" : "X");
    setCurrentPlayer(startingPlayer === "X" ? "O" : "X");
    setMoveCount(0);
    shift = -1;
    gameOver = false;
    rotation = "0deg";
    setDraw(false);
  };

  const updateScore = (winner) => {
    //Alert.alert(`Score updated for Player ${winner}`);

    setScores((prevScores) => ({
      ...prevScores,
      [winner]: prevScores[winner] + 1,
    }));
  };

  const handleAddHighScore = async () => {
    const newHighScore1 = { name: playerXName, score: scores.X };
    const newHighScore2 = { name: playerOName, score: scores.O };

    try {
      await addHighScore(newHighScore1);
      await addHighScore(newHighScore2);
      Alert.alert("High scores updated!");
      // Update the local state with the new high score
    } catch (error) {
      console.error("Error adding high score:", error);
    }
  };

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/win.mp3")
      );
      await sound.playAsync();
      await sound.setVolumeAsync(0.2);
      // Optionally unload the sound after playing to free resources
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  useEffect(() => {
    const playBackgroundMusic = async () => {
      let musicFile;

      switch (currentMusic) {
        case "eighties":
          musicFile = require("../assets/eighties.mp3");
          break;
        case "arcade":
          musicFile = require("../assets/arcade.mp3");
          break;
        case "space":
          musicFile = require("../assets/space.mp3");
          break;
        default:
          musicFile = require("../assets/eighties.mp3"); // Default music
      }

      const { sound } = await Audio.Sound.createAsync(musicFile);
      setSound(sound);
      await sound.playAsync();
      await sound.setVolumeAsync(0.1);
      await sound.setIsLoopingAsync(true);
    };

    playBackgroundMusic();

    return () => {
      if (sound) {
        sound.unloadAsync(); // Unload the sound when the component is unmounted
      }
    };
  }, [currentMusic]); // Re-run this effect whenever currentMusic changes

  const stopMusic = async () => {
    if (sound) {
      await sound.stopAsync(); // Stops the music
      await sound.unloadAsync(); // Unloads the music to free resources
      setSound(null); // Optionally clear the sound state
    }
  };

  
  // Render a single cell
  const renderCell = (row, col) => {
    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={styles.cell}
        onPress={() => handlePress(row, col)}
      >
        <Text style={styles.cellText}>{grid[row][col]}</Text>
      </TouchableOpacity>
    );
  };

  // Render the grid
  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, colIndex) => renderCell(rowIndex, colIndex))}
      </View>
    ));
  };

  const headerStyle = {
    ...styles.header,
    backgroundColor: `#${color}` || "#1FB0B6", // Fallback to default color if `colour` is undefined
  }; 

  const constainerStyle = {
    ...styles.container,
    borderColor: `#${color}` || "#1FB0B6", // Fallback to default color if `colour` is undefined
  };

  const addButtonStyle = {
    ...styles.addButton,
    borderColor: `#${color}` || "#1FB0B6", // Fallback to default color if `colour` is undefined
  };

  const scoreBoardStyle = {
    ...styles.scoreBoard,
    borderColor: `#${color}` || "#1FB0B6", // Fallback to default color if `colour` is undefined
  };

  return (
    <View style={constainerStyle}>
      <View style={headerStyle}>
        <TouchableOpacity
          onPress={() => {
            resetGame();
            stopMusic();
            router.push(
              `/home?music=${music}&player1=${playerXName}&player2=${playerOName}&color=${color}`
            )
          }}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        <Text style={styles.title}>Settings</Text>

        <TouchableOpacity
          onPress={() => {
            resetGame();
            stopMusic();
            router.push(
              `/home?music=${music}&player1=${playerXName}&player2=${playerOName}&color=${color}`
            )
          }}
          style={styles.iconButton}
        >
          <Ionicons name="home" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Scoreboard and other text at the top */}
      <View style={scoreBoardStyle}>
        <Text style={styles.scoreText}>
          {playerXName} (X): {scores.X}
        </Text>
        <Text style={styles.scoreText}>
          {playerOName} (O): {scores.O}
        </Text>
        <Text style={styles.scoreText}>{currentPlayer === "X" ? playerXName : playerOName}'s turn</Text>
      </View>

      {/* Centered Game Grid */}

      <View style={styles.gridContainer}>{renderGrid()}</View>
      {gameOver && (
        <View
          style={[
            styles.overlayLine,
            {
              transform: [
                { translateY: -lineThickness / 2 },
                { rotate: rotation },
                { translateY: (shift - 1) * cellSize },
              ],
            },
          ]}
        />
      )}
      {gameOver && (
        <View style={{ alignItems: "center", marginTop: cellSize * 3.8 }}>
          <Text style={styles.winText}>
          {currentPlayer === "X" ? playerOName : playerXName} wins!
          </Text>
          <TouchableOpacity style={addButtonStyle} onPress={resetGame}>
            <Text style={styles.addButtonText}>Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={addButtonStyle}
            onPress={handleAddHighScore}
          >
            <Text style={styles.addButtonText}>Save High Score</Text>
          </TouchableOpacity>
        </View>
      )}
      {draw && (
        <View style={{ alignItems: "center", marginTop: cellSize * 3.8 }}>
          <Text style={styles.winText}>
          It's a draw!
          </Text>
          <TouchableOpacity style={addButtonStyle} onPress={resetGame}>
            <Text style={styles.addButtonText}>Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={addButtonStyle}
            onPress={handleAddHighScore}
          >
            <Text style={styles.addButtonText}>Save High Score</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 10,
    //borderColor: "#1FB0B6",
    borderRadius: 20,
    margin: 10,
    backgroundColor: "#fff",
    position: "relative",
  },
  iconButton: {
    paddingHorizontal: 10,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //backgroundColor: "#1FB0B6",
    padding: 20,
  },
  addButton: {
    borderWidth: 3,
    //borderColor: "#1FB0B6",
    borderRadius: 20,
    height: 50,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  addButtonText: {
    fontSize: 20,
  },
  scoreBoard: {
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 8,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 10,
    //borderColor: "#1FB0B6",
    marginTop: -10,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  winText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
  },
  gridContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -cellSize * 1.5 },
      { translateY: -cellSize * 1.5 },
    ],
  },
  cell: {
    width: cellSize,
    height: cellSize,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  resetButton: {
    width: 100,
    height: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  cellText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  overlayLine: {
    position: "absolute",
    top: "50%",
    left: leftOffset - 20,
    right: 0,
    height: lineThickness,
    width: lineWidth,
    backgroundColor: "red",
    opacity: 0.8,
  },
});

export default Game;
