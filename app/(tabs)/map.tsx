import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

import { Button, Input, XStack, YStack } from "tamagui";

interface InputRowProps {
  text: string;
  value: string;
  onChange: (next: string) => void;
}

function InputRow({ text, value, onChange }: InputRowProps) {
  return (
    <XStack gap={"$2"} style={styles.inputRow}>
      <Text style={styles.inputRowText}>{text}</Text>
      <Input style={styles.input} value={value} onChangeText={onChange} />
    </XStack>
  );
}

export default function MapScreen() {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const handleSearch = () => {
    console.log(`${from} ${to}`);
  };

  return (
    <>
      <View style={styles.default}>
        <View style={styles.directionBox}>
          <YStack gap={"$2"}>
            <InputRow text="From" value={from} onChange={setFrom} />
            <InputRow text="To" value={to} onChange={setTo} />
            <Button onPress={handleSearch}>Search</Button>
          </YStack>
        </View>
        <MapView style={styles.map} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  default: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  directionBox: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 49,
    zIndex: 10,
    backgroundColor: "white",
    width: "100%",
    padding: 10,
  },
  inputRow: {
    marginLeft: "auto",
  },
  input: {
    flexGrow: 1,
  },
  inputRowText: {
    // left: 0,
  },
});
