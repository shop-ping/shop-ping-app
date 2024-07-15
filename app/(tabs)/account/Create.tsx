import React, { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

import { Button } from "tamagui";

import { commonStyles as styles } from "./styles";

interface CreateProps {
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setIsCreatingAccount: (isCreatingAccount: boolean) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const DEFAULT_ACCOUNT_ERRORS = {
  usernameC: false,
  email: false,
  passwordV1: false,
  passwordV2: false,
};

export default function Create({
  setUsername,
  setEmail,
  setPassword,
  setIsCreatingAccount,
  setIsLoggedIn,
}: CreateProps) {
  const [newUsername, setNewUsername] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [inputErrors, setInputErrors] = useState(DEFAULT_ACCOUNT_ERRORS);

  const handleCreateAccount = () => {
    const errors = { ...DEFAULT_ACCOUNT_ERRORS };
    let emptyFlag = false;

    if (newUsername.trim() === "") {
      errors.usernameC = true;
      emptyFlag = true;
    }
    if (newEmail.trim() === "") {
      errors.email = true;
      emptyFlag = true;
    }
    if (newPassword.trim() === "") {
      errors.passwordV1 = true;
      emptyFlag = true;
    }
    if (confirmPassword.trim() === "") {
      errors.passwordV2 = true;
      emptyFlag = true;
    }

    setInputErrors(errors);

    if (emptyFlag) {
      Alert.alert(
        "Validation Error",
        "Missing information, please fill all forms.",
      );
    } else if (newPassword !== confirmPassword) {
      setInputErrors({
        ...errors,
        passwordV1: true,
        passwordV2: true,
      });
      setConfirmPassword("");
      Alert.alert(
        "Validation Error",
        "Passwords do not match, please try again.",
      );
    } else {
      setUsername(newUsername);
      setEmail(newEmail);
      setPassword(newPassword);
      setIsCreatingAccount(false);
    }
  };

  return (
    <View style={styles.wrapSubL}>
      <Text style={styles.inputTitleL}>Username</Text>
      <TextInput
        placeholder="username"
        style={[styles.inputL, inputErrors.usernameC && styles.inputErrorL]}
        value={newUsername}
        onChangeText={setNewUsername}
      />
      <Text style={styles.inputTitleL}>Email</Text>
      <TextInput
        placeholder="email"
        style={[styles.inputL, inputErrors.email && styles.inputErrorL]}
        value={newEmail}
        onChangeText={setNewEmail}
      />
      <Text style={styles.inputTitleL}>Password</Text>
      <TextInput
        placeholder="enter password"
        style={[styles.inputL, inputErrors.passwordV1 && styles.inputErrorL]}
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Text style={styles.inputTitleL}>Confirm Password</Text>
      <TextInput
        placeholder="re-enter password"
        style={[styles.inputL, inputErrors.passwordV2 && styles.inputErrorL]}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button
        style={styles.buttonL}
        color="#fff"
        backgroundColor="#8dbf36"
        onPress={handleCreateAccount}
      >
        Create Account
      </Button>
      <Button
        style={styles.buttonL}
        color="#8dbf36"
        borderColor="#8dbf36"
        variant="outlined"
        onPress={() => {
          setIsCreatingAccount(false);
        }}
      >
        Back to Login
      </Button>
    </View>
  );
}
