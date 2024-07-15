import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import LogoImg from "@/assets/images/logo.png";

export default function HomeScreen() {
  return (
    <View style={styles.default}>
      <Image source={LogoImg} alt="logo" style={styles.image} />
      <Text style={styles.header}>Welcome to ShopPing!</Text>
      <Text style={styles.subTitle}>
        Please explore our app using the buttons below.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  default: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 32,
    fontWeight: "700",
  },
  subTitle: {
    marginTop: 15,
    fontSize: 18,
  },
  image: {
    width: "50%",
    resizeMode: "contain",
    marginTop: "20%",
  },
});
