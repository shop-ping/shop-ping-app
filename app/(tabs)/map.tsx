import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

import { Button, Input, XStack, YStack } from "tamagui";

interface InputRowProps {
  text: string;
}

function InputRow({ text }: InputRowProps) {
  return (
    <XStack gap={"$2"} style={styles.inputRow}>
      <Text style={styles.inputRowText}>{text}</Text>
      <Input style={styles.input} />
    </XStack>
  );
}

export default function MapScreen() {
  return (
    <>
      <View style={styles.default}>
        <View style={styles.directionBox}>
          <YStack gap={"$2"}>
            <InputRow text="From" />
            <InputRow text="To" />
            <Button>Search</Button>
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
