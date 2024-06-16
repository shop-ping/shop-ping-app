import { StyleSheet, Text, View } from "react-native";

export default function ListsScreen() {
  return (
    <View style={styles.default}>
      <Text>Lists Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  default: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
