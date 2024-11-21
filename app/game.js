import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  StatusBar,
} from "react-native";
import { addHighScore } from "./api";

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
  const [playerXName, setPlayerXName] = useState("Gabriel");
  const [playerOName, setPlayerOName] = useState("Viktor");

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
      Alert.alert(`Player ${currentPlayer} wins!`);
      //resetGame();
    } else if (moveCount === 8) {
      Alert.alert("It's a draw!");
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
  };

  const updateScore = (winner) => {
    //Alert.alert(`Score updated for Player ${winner}`);

    setScores((prevScores) => ({
      ...prevScores,
      [winner]: prevScores[winner] + 1,
    }));
  };

  const handleAddHighScore = async () => {
    const newHighScore1 = { name: playerXName, score: scores.X }; // Example data
    const newHighScore2 = { name: playerOName, score: scores.O }; // Example data

    try {
      const addedHighScore1 = await addHighScore(newHighScore1);
      const addedHighScore2 = await addHighScore(newHighScore2);


      // Update the local state with the new high score
    } catch (error) {
      console.error("Error adding high score:", error);
    }
  };

  // Render a single cell
  const renderCell = (row, col) => {
    return (
      <TouchableOpacity
        key={`${row}-${col}`} // Add a unique key prop
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

  return (
    <View style={styles.container}>
      {/* Scoreboard and other text at the top */}
      <View style={styles.scoreBoard}>
        <Text style={styles.scoreText}>
          {playerXName} (X): {scores.X}
        </Text>
        <Text style={styles.scoreText}>
          {playerOName} (O): {scores.O}
        </Text>
        <Text style={styles.scoreText}>Player {currentPlayer} turn</Text>
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
        <View>
          <Text style={styles.scoreText}>
            Player {currentPlayer === "X" ? "O" : "X"} wins!
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddHighScore}
          >
            <Text style={styles.addButtonText}>Add High Score</Text>
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
    borderWidth: 10, // Border width around the entire screen
    borderColor: "#1FB0B6", // Border color
    borderRadius: 20, // Round the corners
    padding: 0, // Padding around the content
    margin: 10, // Optional: add space between the border and the screen edge
    backgroundColor: "#fff", // Background color for the screen
    position: "relative", // Add position relative to make overlayLine work correctly
  },
  scoreBoard: {
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#e6e6e6",
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
  },
  gridContainer: {
    position: "absolute", // Make the grid container absolute
    top: "50%", // Center it vertically
    left: "50%", // Center it horizontally
    transform: [
      { translateX: -cellSize * 1.5 },
      { translateY: -cellSize * 1.5 },
    ], // Center the grid
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
