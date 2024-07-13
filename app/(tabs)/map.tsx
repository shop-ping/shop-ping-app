import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

export default function MapScreen() {
  return (
    <View style={styles.default}>
      <Text>Map Page</Text>
      <MapView style={styles.map} />
    </View>
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
});
