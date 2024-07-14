import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

import { Section } from "tamagui";

import LogoImg from "../../../assets/images/logo.png";
import Account from "./Account";
import Create from "./Create";
import Login from "./Login";
import { commonStyles as styles } from "./styles";

export default function Index() {
  const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("user123");
  const [email, setEmail] = useState<string>("user123@gmail.com");
  const [password, setPassword] = useState<string>("123");

  return (
    <View style={styles.containerL}>
      {isLoggedIn ? (
        <Account
          username={username}
          email={email}
          password={password}
          setUsername={setUsername}
          setEmail={setEmail}
          setPassword={setPassword}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <>
          <Section style={styles.sectionL}>
            <Image source={LogoImg} alt="logo" style={styles.imageL} />
          </Section>

          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <Text style={styles.titleL}>Welcome to ShopPing</Text>
            {isCreatingAccount ? (
              <Create
                setUsername={setUsername}
                setEmail={setEmail}
                setPassword={setPassword}
                setIsCreatingAccount={setIsCreatingAccount}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Login
                username={username}
                password={password}
                setIsCreatingAccount={setIsCreatingAccount}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}
