import React, { useState } from "react";
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Button, Section, Slider } from "tamagui";

import { commonStyles as styles } from "./styles";

interface AccountProps {
  username: string;
  email: string;
  password: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function Account({
  username,
  email,
  password,
  setUsername,
  setEmail,
  setPassword,
  setIsLoggedIn,
}: AccountProps) {
  const [selectedTab, setSelectedTab] = useState("Membership");
  const [password2, setPassword2] = useState<string>("");
  const [doNotDisturb, setDoNotDisturb] = useState<boolean>(false);
  const [radius, setRadius] = useState<number>(50);
  const [maxNotifications, setMaxNotifications] = useState<number>(10);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const membershipOptions = [
    {
      name: "Freemium",
      price: "7 days free trial!",
      features: ["No Ads", "Store Preferences", "Unlocked Discounts"],
    },
    {
      name: "Monthly",
      price: "$6.99",
      features: ["No Ads", "Store Preferences", "Unlocked Discounts"],
    },
    {
      name: "Yearly",
      price: "$69.99",
      features: ["No Ads", "Store Preferences", "Unlocked Discounts"],
    },
  ];

  const renderSection = () => {
    switch (selectedTab) {
      case "Membership":
        return (
          <View style={styles.wrapSubL}>
            <Text style={styles.headerA}>Membership Section</Text>
            <Text style={styles.inputTitleL}>
              You do not have a subscription. Register for the free trial before
              you miss out on these hard-to-beat features!
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.membershipSlider}
              contentContainerStyle={styles.membershipContentContainer}
            >
              {membershipOptions.map((option, index) => (
                <View key={index} style={styles.card}>
                  <View style={styles.featureHeader}>
                    <Text style={styles.cardText}>{option.name}</Text>
                    <Text style={styles.cardPrice}>{option.price}</Text>
                  </View>
                  <View style={styles.featureList}>
                    {option.features.map((feature, idx) => (
                      <View key={idx} style={styles.featureItem}>
                        <Text style={styles.checkmark}>✓</Text>
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                  <Button
                    style={styles.buttonL}
                    color="#fff"
                    backgroundColor="#8dbf36"
                  >
                    Register
                  </Button>
                </View>
              ))}
            </ScrollView>
          </View>
        );
      case "Notifications":
        return (
          <View style={styles.wrapSubL}>
            <Text style={styles.headerA}>Notifications Section</Text>
            {doNotDisturb ? (
              <Text style={styles.inputTitleL}>
                Options disabled, route pre-planning only
              </Text>
            ) : (
              <Text style={styles.inputTitleL}>
                Product proximity notifications enabled
              </Text>
            )}

            <View style={styles.wrapDND}>
              <Text style={styles.inputTitleDND}>Do Not Disturb</Text>
              <Switch
                value={doNotDisturb}
                onValueChange={setDoNotDisturb}
                trackColor={{ false: "#ccc", true: "#8dbf36" }}
                thumbColor="#fff"
              />
            </View>
            <Text style={styles.inputTitleL}>Notification Radius (km)</Text>
            <Slider
              defaultValue={[radius]}
              max={100}
              step={10}
              onValueChange={(value) => {
                setRadius(value[0]);
              }}
              disabled={doNotDisturb}
              style={styles.slider}
            >
              <Slider.Track>
                <Slider.TrackActive
                  backgroundColor={doNotDisturb ? "#ccc" : "#8dbf36"}
                />
              </Slider.Track>
              <Slider.Thumb
                backgroundColor="#fff"
                borderColor={doNotDisturb ? "#ccc" : "#8dbf36"}
                size="$1"
                index={0}
                circular
              />
            </Slider>
            <Text>{radius} km</Text>

            <Text style={styles.inputTitleL}>Max Notifications per Week</Text>
            <Slider
              defaultValue={[maxNotifications]}
              max={20}
              step={1}
              onValueChange={(value) => {
                setMaxNotifications(value[0]);
              }}
              disabled={doNotDisturb}
              style={styles.slider}
            >
              <Slider.Track>
                <Slider.TrackActive
                  backgroundColor={doNotDisturb ? "#ccc" : "#8dbf36"}
                />
              </Slider.Track>
              <Slider.Thumb
                backgroundColor="#fff"
                borderColor={doNotDisturb ? "#ccc" : "#8dbf36"}
                size="$1"
                index={0}
                circular
              />
            </Slider>
            <Text>{maxNotifications} notifications</Text>
            <Button
              style={styles.buttonL}
              color="#8dbf36"
              borderColor="#8dbf36"
              variant="outlined"
            >
              Save Changes
            </Button>
          </View>
        );
      case "Account":
      default:
        return (
          <View style={styles.wrapSubL}>
            <Text style={styles.headerA}>Update Profile Info</Text>
            <Text style={styles.inputTitleL}>Username</Text>
            <TextInput
              style={styles.inputL}
              placeholder="your username"
              value={username}
              onChangeText={setUsername}
            />
            <Text style={styles.inputTitleL}>Email</Text>
            <TextInput
              style={styles.inputL}
              placeholder="your email"
              value={email}
              onChangeText={setEmail}
            />
            <Button
              style={styles.buttonL}
              color="#8dbf36"
              borderColor="#8dbf36"
              variant="outlined"
            >
              Update
            </Button>

            <Text style={styles.headerA}>Update Security Info</Text>
            <Text style={styles.inputTitleL}>Password</Text>
            <TextInput
              style={styles.inputL}
              placeholder="your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Text style={styles.inputTitleL}>Update Password</Text>
            <TextInput
              style={styles.inputL}
              placeholder="confirm password"
              value={password2}
              onChangeText={setPassword2}
              secureTextEntry
            />
            <Button
              style={styles.buttonL}
              color="#8dbf36"
              borderColor="#8dbf36"
              variant="outlined"
            >
              Update
            </Button>
            <Button
              style={styles.buttonL}
              color="#fff"
              backgroundColor="#8dbf36"
              onPress={handleLogout}
            >
              Logout
            </Button>
          </View>
        );
    }
  };

  return (
    <View style={styles.containerL}>
      <Section style={styles.sectionA}></Section>
      <View style={styles.wrapSubL}>
        <Ionicons
          style={styles.profileImg}
          name="person-circle-outline"
          size={100}
          color="black"
        />
        <Text style={styles.titleL}>{username}</Text>
      </View>

      <View style={styles.tabsContainer}>
        {["Membership", "Account", "Notifications"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.selectedTab]}
            onPress={() => {
              setSelectedTab(tab);
            }}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {renderSection()}
      </ScrollView>
    </View>
  );
}
