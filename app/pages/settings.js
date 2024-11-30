import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { useRouter } from "expo-router";

const SettingsScreen = () => {
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const router = useRouter();

  const musicOptions = ["80's Beats", "Jazz", "Classical"];
  const colorOptions = ["Red", "Green", "Blue"];

  const handleMusicSelect = (music) => {
    setSelectedMusic(music);
    console.log("Selected music:", music);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    console.log("Selected color:", color);
  };

  const renderButton = (label, onPress, style, key) => (
    <TouchableOpacity key={key} onPress={onPress} style={styles.button}>
      <Text style={[styles.buttonText, style]}>{label}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View style={styles.scoreItem}>
      <Text style={styles.score}>{item}</Text>
    </View>
  );

  const highScores = ["Alice: 100", "Bob: 90", "Charlie: 80"];

  return (
    <View >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        <Text style={styles.title}>Settings</Text>

        <TouchableOpacity
          onPress={() => router.push("/")}
          style={styles.iconButton}
        >
          <Ionicons name="home" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>


      <View style={{alignItems: 'center' }}>
        <Text style={styles.sectionTitle}>Select Background Music</Text>
        {musicOptions.map((music, index) =>
          renderButton(
            music,
            () => handleMusicSelect(music),
            null,
            `music-${index}`
          )
        )}

        <Text style={styles.sectionTitle}>Select Background Color</Text>
        {colorOptions.map((color, index) =>
          renderButton(
            color,
            () => handleColorSelect(color),
            { color: color.toLowerCase() },
            `color-${index}`
          )
        )}

        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 20,
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
    backgroundColor: "#1FB0B6",
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#1FB0B6",
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    paddingHorizontal: 100,
    marginBottom: 15,
    width: "80%",
    maxWidth: 400,
    borderRadius: 12,
    borderColor: "#1FB0B6",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
  },
});

export default SettingsScreen;
