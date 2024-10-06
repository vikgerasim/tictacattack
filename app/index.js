import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions, StatusBar } from 'react-native';


const screenWidth = Dimensions.get('window').width;

const lineThickness = screenWidth / 25;
const lineWidth = screenWidth * .75;
const leftOffset = screenWidth * .125;
const cellSize = screenWidth / 4;
let winningRow = -1;
const App = () => {

    const [currentPlayer, setCurrentPlayer] = useState('X');

  const [grid, setGrid] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  // Handle cell press
  const handlePress = (row, col) => {
    if (checkWinner(grid)){
        resetGame();
        return;
    }

    // If the cell is already filled, return early
    if (grid[row][col] !== '') return;

    // Copy the grid and update the clicked cell
    const newGrid = [...grid];
    newGrid[row][col] = currentPlayer;

    // Update the state with the new grid and switch players
    setGrid(newGrid);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

    // Check for a winning condition
    if (checkWinner(grid)) {
      Alert.alert(`Player ${currentPlayer} wins! ${winningRow}`);
      //resetGame();
    }
  };

  // Check for a winning condition
  const checkWinner = (grid) => {
    // Check rows
    for (let row of grid) {
        winningRow++;
      if (row[0] !== '' && row[0] === row[1] && row[1] === row[2]) {
        return true;
      }
    }
    winningRow = -1;

    // Check columns
    for (let col = 0; col < 3; col++) {
      if (grid[0][col] !== '' && grid[0][col] === grid[1][col] && grid[1][col] === grid[2][col]) {
        return true;
      }
    }

    // Check diagonals
    if (grid[0][0] !== '' && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
      return true;
    }
    if (grid[0][2] !== '' && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
      return true;
    }

    return false;
  };

  // Reset the game
  const resetGame = () => {
    setGrid([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setCurrentPlayer('X');
    winningRow = -1;
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

  return <View style={styles.container}>
    {renderGrid()}
 
    {/* {checkWinner(grid) && <View style={styles.overlayLine}></View>} */}
    {checkWinner(grid) && (
      <View
        style={[
          styles.overlayLine,
          {
            transform: [
              { translateY: -lineThickness / 2 },
              { rotate: '0deg' },
              { translateY: (winningRow - 1) * cellSize }, 
            ],
          },
        ]}
      />
    )}  
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  resetButton: {
    width: 100,
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20},
  cellText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  overlayLine: {
    position: 'absolute',
    top: '50%', 
    left: leftOffset,
    right: 0,
    height: lineThickness, 
    width: lineWidth, 
    backgroundColor: 'red', 
    opacity: 0.8, 
  },
});

export default App;