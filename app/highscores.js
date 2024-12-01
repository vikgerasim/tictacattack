import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getHighScores } from "./api";
import { Ionicons } from "react-native-vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

const HighScoresScreen = () => {
  const [highScores, setHighScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const { player1, player2, music, color } = useLocalSearchParams();


  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const scores = await getHighScores();
        // Sort scores in descending order
        let sortedScores = scores.sort((a, b) => b.score - a.score);
        setHighScores(sortedScores.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching high scores:", error);
        setLoading(false);
      }
    };

    fetchHighScores();
  }, []);

  const router = useRouter();

  // Render each item in the list
  const renderItem = ({ item }) => (
    <View style={scoreItemStyle}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  const headerStyle = {
    ...styles.header,
    backgroundColor: `#${color}` || "#1FB0B6", // Fallback to default color if `colour` is undefined
  };

  const scoreItemStyle = {
    ...styles.scoreItem,
    borderColor: `#${color}` || "#1FB0B6", // Fallback to default color if `colour` is undefined
  };

  return (
    <View>
      <View style={headerStyle}>
        <TouchableOpacity
          onPress={() => router.push(`/home?music=${music}&player1=${player1}&player2=${player2}&color=${color}`)}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        <Text style={styles.title}>High Scores</Text>

        <TouchableOpacity
          onPress={() => router.push(`/home?music=${music}&player1=${player1}&player2=${player2}&color=${color}`)}
          style={styles.iconButton}
        >
          <Ionicons name="home" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* FlatList to display high scores */}
      <FlatList
        data={highScores}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false} // Hide scroll indicator for cleaner look
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
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
    padding: 20,
    marginBottom: 20,
  },
  scoreItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 10,
    paddingHorizontal: 100,
    marginBottom: 15,
    width: "80%",
    maxWidth: 400,
    borderRadius: 12,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: "500",
    color: "#333",
    textTransform: "capitalize",
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
  },
});

export default HighScoresScreen;
