import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

const SettingsScreen = () => {
  const { player1, player2, music, color } = useLocalSearchParams();

  const [selectedMusic, setSelectedMusic] = useState(`${music}`);
  const [selectedColor, setSelectedColor] = useState(`${color}`);
  const router = useRouter();

  const musicOptions = [
    { name: "80's Beats", path: "eighties" },
    { name: "Arcade", path: "arcade" },
    { name: "Space", path: "space" },
  ];

  const colorOptions = [
    { name: "Teal", code: "1FB0B6" },
    { name: "Blue", code: "4C63E4" },
    { name: "Green", code: "7DDA58" },
    { name: "Red", code: "D20103" }
  ];

  const handleMusicSelect = (music) => {
    setSelectedMusic(music.path); 
    console.log("Selected music file path:", selectedMusic);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color.code); 
    console.log("Selected color:", color);
  };

  const renderButton = (label, onPress, style, key) => (
    <TouchableOpacity key={key} onPress={onPress} style={buttonStyle}>
      <Text style={[styles.buttonText, style]}>{label}</Text>
    </TouchableOpacity>
  );


  const headerStyle = {
    ...styles.header,
    backgroundColor: `#${selectedColor}` || "#1FB0B6", 
  };

  const sectionTitleStyle = {
    ...styles.sectionTitle,
    color: `#${selectedColor}` || "#1FB0B6", 
  };

  const buttonStyle = {
    ...styles.button,
    borderColor: `#${selectedColor}` || "#1FB0B6", 
  };

  return (
    <View >
      <View style={headerStyle}>
        <TouchableOpacity
          onPress={() => router.push(`/home?music=${selectedMusic}&player1=${player1}&player2=${player2}&color=${selectedColor}`)}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        <Text style={styles.title}>Settings</Text>

        <TouchableOpacity
          onPress={() => router.push(`/home?music=${selectedMusic}&player1=${player1}&player2=${player2}&color=${selectedColor}`)}
          style={styles.iconButton}
        >
          <Ionicons name="home" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center' }}>
        <Text style={sectionTitleStyle}>Select Background Music</Text>
        {musicOptions.map((music, index) =>
          renderButton(
            music.name,
            () => handleMusicSelect(music),
            null,
            `music-${index}`
          )
        )}

        <Text style={sectionTitleStyle}>Select Background Color</Text>
        {colorOptions.map((color, index) =>
          renderButton(
            color.name,
            () => handleColorSelect(color),
            { color: `#${color.code}` },
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
