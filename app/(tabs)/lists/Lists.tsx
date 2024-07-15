import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import type { SelectProps } from "tamagui";
import { Adapt, Button, Checkbox, Input, Select, Sheet, YStack } from "tamagui";

import itemList from "../../../data/list-data";
import listList from "../../../data/lists-data";
import ItemModal from "./ItemModal";

interface Item {
  name: string;
  quantity: number;
  checked: boolean;
}
export default function Lists() {
  const [items, setItems] = useState<Item[]>(itemList);
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Define type for modalVisible

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
    closeModal();
    // Process the user input here as needed
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="list" size={40} color="black" style={styles.icon} />
        <Text style={styles.title}>Shopping List</Text>
      </View>
      <View style={styles.header1}>
        <ListSelector></ListSelector>
        <Button
          style={styles.shareButton}
          width="25%"
          color={"#fff"}
          backgroundColor={"#A3CD3A"}
        >
          Share
        </Button>
      </View>

      <ScrollView>
        {items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Checkbox size="$4">
              <Checkbox.Indicator>
                <Ionicons name="checkmark" size={18} color="black" />
              </Checkbox.Indicator>
            </Checkbox>
            <Text style={styles.itemName}>{item.name}</Text>
            <Input
              size="$4"
              borderWidth={2}
              defaultValue={item.quantity.toString()}
            />

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
export function ListSelector(props: SelectProps) {
  const [val, setVal] = useState("list");

  return (
    <Select
      value={val}
      onValueChange={setVal}
      disablePreventBodyScroll
      {...props}
    >
      <Select.Trigger
        width={220}
        iconAfter={<Ionicons name="chevron-down" size={24} color="black" />}
      >
        <Select.Value placeholder="Select a list" />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: "spring",
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <Ionicons name="chevron-up" size={24} color="black" />
          </YStack>
          {/*}
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', 'transparent']}
            borderRadius="$4"
          />*/}
        </Select.ScrollUpButton>

        <Select.Viewport
          // to do animations:
          // animation="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ o: 0, y: -10 }}
          // exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          <Select.Group>
            <Select.Label>Lists</Select.Label>
            {useMemo(
              () =>
                listList.map((listList, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={listList.name}
                      value={listList.name.toLowerCase()}
                    >
                      <Select.ItemText>{listList.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Ionicons name="checkmark" size={16} color="black" />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [listList],
            )}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 5,
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
    fontSize: 20,
    paddingLeft: 10,
  },
  itemQuantity: {
    alignSelf: "flex-end",
    fontSize: 20,
    paddingRight: 20,
  },
  picker: {
    height: 50,
    width: 100,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  header1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    marginTop: 45,
    marginRight: 10,
  },
  shareButton: {
    alignSelf: "flex-end",
    marginLeft: 40,
  },
});
