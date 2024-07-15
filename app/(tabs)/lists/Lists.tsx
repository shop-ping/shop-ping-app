import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ItemModal from "./ItemModal";

interface Item {
  name: string;
  quantity: number;
}
const initialItems: Item[] = [
  { name: "Marinara Sauce", quantity: 1 },
  { name: "Spaghetti Pasta", quantity: 2 },
  { name: "Cucumbers", quantity: 3 },
  { name: "Peppers", quantity: 5 },
  { name: "Paper Towel", quantity: 1 },
  { name: "Toothpaste", quantity: 1 },
];

export default function Lists() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Define type for modalVisible
  const [userInput, setUserInput] = useState<string>(""); // Define type for userInput

  useEffect(() => {
    // Temporary state update inside useEffect
    const newItems = [...items];
    newItems.push({ name: "New Item", quantity: 1 });
    setItems(newItems);

    // Cleanup function to revert state after component unmounts (optional)
    return () => {
      setItems(initialItems);
    };
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleModalSubmit = (input: string) => {
    setUserInput(input);
    closeModal();
    // Process the user input here as needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ShopPing List</Text>
      <ScrollView>
        {items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.dot} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemName}>{userInput}</Text>
            {/*<Picker
              selectedValue={item.quantity}
              style={styles.picker}
              onValueChange={(itemValue) => {
                const newItems = [...items];
                newItems[index].quantity = itemValue as number;
                setItems(newItems);
              }}
            >
              {[...Array(10).keys()].map((num) => (
                <Picker.Item key={num} label={`${num + 1}`} value={num + 1} />
              ))}
            </Picker>*/}
            {/*<CheckBox />*/}
            <ItemModal
              visible={modalVisible}
              onClose={closeModal}
              onSubmit={handleModalSubmit}
            />
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
    marginRight: 10,
  },
  itemName: {
    flex: 1,
    fontSize: 18,
  },
  picker: {
    height: 50,
    width: 100,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#A3CD3A",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 30,
    color: "#fff",
  },
});
