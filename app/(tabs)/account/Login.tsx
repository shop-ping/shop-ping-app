import React, { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

import { Button } from "tamagui";

import { commonStyles as styles } from "./styles";

interface LoginProps {
  username: string;
  password: string;
  setIsCreatingAccount: (isCreatingAccount: boolean) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function Login({
  username,
  password,
  setIsCreatingAccount,
  setIsLoggedIn,
}: LoginProps) {
  const [inputUsername, setInputUsername] = useState<string>(username);
  const [inputPassword, setInputPassword] = useState<string>(password);

  const handleLogin = () => {
    if (inputUsername === username && inputPassword === password) {
      setIsLoggedIn(true);
    } else {
      Alert.alert("Invalid credentials", "Please try again.");
    }
  };

  return (
    <View style={styles.wrapSubL}>
      <Text style={styles.inputTitleL}>Email</Text>
      <TextInput
        style={styles.inputL}
        placeholder="your email"
        value={inputUsername}
        onChangeText={setInputUsername}
        autoCapitalize="none"
      />
      <Text style={styles.inputTitleL}>Password</Text>
      <TextInput
        style={styles.inputL}
        placeholder="your password"
        value={inputPassword}
        onChangeText={setInputPassword}
        secureTextEntry
      />
      <Button
        style={styles.buttonL}
        color="#fff"
        backgroundColor="#8dbf36"
        onPress={handleLogin}
      >
        Login
      </Button>
      <Button
        style={styles.buttonL}
        color="#8dbf36"
        borderColor="#8dbf36"
        variant="outlined"
        onPress={() => {
          setIsCreatingAccount(true);
        }}
      >
        Create Account
      </Button>
      <Text style={styles.linkL}>Forgot password?</Text>
      <Text style={styles.linkL}>Privacy</Text>
      <Text style={styles.linkL}>FAQ</Text>
    </View>
  );
}
