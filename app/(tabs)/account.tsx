import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";

import { Button, Section } from "tamagui";

import IconTemp from "../../assets/images/icon.png";
import LogoImg from "../../assets/images/logo.png";

interface AccountErrors {
  usernameC: boolean;
  email: boolean;
  passwordV1: boolean;
  passwordV2: boolean;
}
const DEFAULT_ACCOUNT_ERRORS: AccountErrors = {
  usernameC: false,
  email: false,
  passwordV1: false,
  passwordV2: false,
};

export default function AccountScreen() {
  // Login inputs
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Create account inputs
  const [usernameC, setUsernameC] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [passwordV1, setPasswordV1] = useState<string>("");
  const [passwordV2, setPasswordV2] = useState<string>("");
  const [inputErrors, setInputErrors] = useState<AccountErrors>(
    DEFAULT_ACCOUNT_ERRORS,
  );

  // Account information (retrieve from backend)
  const [usernameA, setUsernameA] = useState<string>("user123");
  const [emailA, setEmailA] = useState<string>("user123@gmail.com");
  const [passwordA1, setPasswordA1] = useState<string>("123");
  const [passwordA2, setPasswordA2] = useState<string>("");

  // View options to set login/ create/ account view
  const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // const navigation = useNavigation();

  const handleLogin = () => {
    const hardcodedUser = "user123";
    const hardcodedPassword = "123";

    if (username === hardcodedUser && password === hardcodedPassword) {
      setIsLoggedIn(true);
    } else {
      Alert.alert("Invalid credentials", "Please try again.");
    }
  };

  const handleCreate = () => {
    const errors: AccountErrors = { ...DEFAULT_ACCOUNT_ERRORS };

    let emptyFlag = false;

    if (usernameC.trim() === "") {
      errors.usernameC = true;
      emptyFlag = true;
    }
    if (email.trim() === "") {
      errors.email = true;
      emptyFlag = true;
    }
    if (passwordV1.trim() === "") {
      errors.passwordV1 = true;
      emptyFlag = true;
    }
    if (passwordV2.trim() === "") {
      errors.passwordV2 = true;
      emptyFlag = true;
    }
    setInputErrors(errors);

    if (emptyFlag) {
      Alert.alert(
        "Validation Error",
        "Missing information, please fill all forms.",
      );
    } else if (passwordV1 !== passwordV2) {
      setInputErrors({
        ...errors,
        passwordV1: true,
        passwordV2: true,
      });

      setPasswordV2("");
      Alert.alert(
        "Validation Error",
        "Passwords do not match, please try again.",
      );
    } else {
      resetCreate(); // back to login if all forms validated
    }
  };

  const resetCreate = () => {
    setUsername(usernameC);
    setPassword(passwordV1);
    setUsernameC("");
    setEmail("");
    setPasswordV1("");
    setPasswordV2("");
    setInputErrors({ ...DEFAULT_ACCOUNT_ERRORS });
    setIsCreatingAccount(false);
  };

  return (
    <View style={styles.containerL}>
      {isLoggedIn ? (
        <>
          <Section style={styles.sectionA}></Section>
          <Image source={IconTemp} alt="logo" style={styles.profileImg} />
          <Text style={styles.titleL}>{username}</Text>
          <Text style={styles.headerA}>Update Profile Info</Text>
          <Text style={styles.inputTitleL}>Username</Text>
          <TextInput
            style={styles.inputL}
            value={usernameA}
            onChangeText={setUsernameA}
          />
          <Text style={styles.inputTitleL}>Email</Text>
          <TextInput
            style={styles.inputL}
            value={emailA}
            onChangeText={setEmailA}
          />
          <Text style={styles.inputTitleL}>Password</Text>
          <TextInput
            style={styles.inputL}
            value={passwordA1}
            onChangeText={setPasswordA1}
            secureTextEntry
          />
          <Text style={styles.inputTitleL}>Confirm New Password</Text>
          <TextInput
            style={styles.inputL}
            value={passwordA2}
            onChangeText={setPasswordA2}
            secureTextEntry
          />
          <Button
            style={styles.buttonL}
            color="#8dbf36"
            borderColor="#8dbf36"
            variant="outlined"
          >
            {" "}
            Update{" "}
          </Button>
          <Button
            style={styles.buttonL}
            color="#fff"
            backgroundColor="#8dbf36"
            onPress={() => {
              setIsLoggedIn(false);
            }}
          >
            {" "}
            Logout{" "}
          </Button>
        </>
      ) : (
        <>
          <Section style={styles.sectionL}>
            <Image source={LogoImg} alt="logo" style={styles.imageL} />
          </Section>
          <Text style={styles.titleL}>Welcome to ShopPing</Text>

          {isCreatingAccount ? (
            <>
              <TextInput
                placeholder="username"
                style={[
                  styles.inputL,
                  inputErrors.usernameC && styles.inputErrorL, // Error style if username is empty
                ]}
                value={usernameC}
                onChangeText={setUsernameC}
              />
              <TextInput
                placeholder="email"
                style={[
                  styles.inputL,
                  inputErrors.email && styles.inputErrorL, //Error style if email is empty
                ]}
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                placeholder="enter password"
                style={[
                  styles.inputL,
                  inputErrors.passwordV1 && styles.inputErrorL, // Error style if passwordV1 is empty or mismatched
                ]}
                value={passwordV1}
                onChangeText={setPasswordV1}
                secureTextEntry={true}
              />
              <TextInput
                placeholder="re-enter password"
                style={[
                  styles.inputL,
                  inputErrors.passwordV2 && styles.inputErrorL, // Error style if passwordV2 is empty or mismatched
                ]}
                value={passwordV2}
                onChangeText={setPasswordV2}
                secureTextEntry={true}
              />
              <Button
                style={styles.buttonL}
                color="#fff"
                backgroundColor="#8dbf36"
                onPress={handleCreate}
              >
                Create Account
              </Button>
              <Button
                style={styles.buttonL}
                color="#8dbf36"
                borderColor="#8dbf36"
                variant="outlined"
                onPress={() => {
                  resetCreate();
                }}
              >
                Back to Login
              </Button>
            </>
          ) : (
            <>
              <Text style={styles.inputTitleL}>Email</Text>
              <TextInput
                style={styles.inputL}
                placeholder="your email"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
              <Text style={styles.inputTitleL}>Password</Text>
              <TextInput
                style={styles.inputL}
                placeholder="your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Button
                style={styles.buttonL}
                color="#fff"
                backgroundColor="#8dbf36"
                onPress={handleLogin}
              >
                {" "}
                Login{" "}
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
                {" "}
                Create Account{" "}
              </Button>
              <Text style={styles.linkL}>Forgot password?</Text>
              <Text style={styles.linkL}>Privacy</Text>
              <Text style={styles.linkL}>FAQ</Text>
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerL: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: "5%",
  },
  sectionL: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    width: "100%",
    paddingTop: 20,
    marginBottom: 30,
  },
  imageL: {
    height: "70%",
    marginTop: 0,
    resizeMode: "contain",
  },
  titleL: {
    fontSize: 24,
    fontWeight: "bold",
    width: "80%",
    textAlign: "center",
    marginBottom: 20,
  },
  inputL: {
    width: "80%",
    minHeight: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 8,
    borderRadius: 3,
    fontSize: 15,
  },
  inputTitleL: {
    margin: 3,
    width: "80%",
    color: "#969696",
    fontSize: 15,
  },
  buttonL: {
    width: "80%",
    marginTop: 15,
    borderRadius: 3,
    height: 40,
    fontSize: 15,
  },
  linkL: {
    width: "80%",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 10,
  },
  inputErrorL: {
    borderColor: "red",
  },

  sectionA: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    width: "100%",
    paddingTop: 20,
  },
  profileImg: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 50,
    marginTop: -50,
    borderColor: "black",
    borderWidth: 2,
  },
  headerA: {
    fontSize: 16,
    fontWeight: "500",
    width: "80%",
    marginBottom: 10,
  },
});
