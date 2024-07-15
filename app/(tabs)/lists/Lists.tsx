import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Check } from "@tamagui/lucide-icons";
import { Checkbox } from "tamagui";

import itemList from "../../../data/list-data";
import ItemModal from "./ItemModal";

interface Item {
  name: string;
  quantity: number;
  checked: boolean;
}

export default function Lists() {
  const [items, setItems] = useState<Item[]>(itemList);
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Define type for modalVisible
  {
    /*const [userInput, setUserInput] = useState<string>(""); // Define type for userInput*/
  }

  useEffect(() => {
    // Temporary state update inside useEffect
    const newItems = [...items];
    newItems.push({ name: "New Item", quantity: 1, checked: false });
    setItems(newItems);

    // Cleanup function to revert state after component unmounts (optional)
    return () => {
      setItems(itemList);
    };
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleModalSubmit = (input: string) => {
    {
      /*setUserInput(input);*/
    }
    closeModal();
    // Process the user input here as needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ShopPing List</Text>
      <ScrollView>
        {items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Checkbox size="$4">
              <Checkbox.Indicator>
                <Check />
              </Checkbox.Indicator>
            </Checkbox>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>{item.quantity}</Text>
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 50,
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
  itemQuantity: {
    alignSelf: "flex-end",
    fontSize: 18,
    paddingRight: 20,
  },
  picker: {
    height: 50,
    width: 100,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 155,
    backgroundColor: "#A3CD3A",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 50,
    color: "#fff",
    lineHeight: 55,
  },
});
