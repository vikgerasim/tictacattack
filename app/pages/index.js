// pages/index.js
import React from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to Login" onPress={() => router.push('/login')} />
    </View>
  );
};

export default Home;