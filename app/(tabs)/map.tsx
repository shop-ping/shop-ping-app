import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Geojson, LatLng, Polyline } from "react-native-maps";

import { Button, Input, XStack, YStack } from "tamagui";

import { SessionIdContext } from "@/app/_layout";
import {
  mapboxCategorySearch,
  mapboxDirections,
  mapboxSearch,
} from "@/shared/mapbox.service";
import { FeatureCollection } from "geojson";

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
  const [directions, setDirections] = useState<LatLng[]>([]);
  const [places, setPlaces] = useState<FeatureCollection | null>(null);
  const sessionId = useContext<string>(SessionIdContext);

  const handleSearch = async () => {
    setDirections([]);
    const { fromFeatures, toFeatures } = await mapboxSearch(
      from,
      to,
      sessionId,
    );
    setFrom(fromFeatures[0].properties.address);
    setTo(toFeatures[0].properties.address);
    console.log(`From: ${fromFeatures[0].properties.full_address}`);
    console.log(`To: ${toFeatures[0].properties.full_address}`);
    const fromCoordsObj = fromFeatures[0].properties.coordinates;
    const toCoordsObj = toFeatures[0].properties.coordinates;
    const fromLongLat: [number, number] = [
      fromCoordsObj.longitude,
      fromCoordsObj.latitude,
    ];
    const toLongLat: [number, number] = [
      toCoordsObj.longitude,
      toCoordsObj.latitude,
    ];
    const { polyline, coords } = await mapboxDirections(fromLongLat, toLongLat);
    setDirections(coords);
    const storesGeoJson = await mapboxCategorySearch(polyline);
    setPlaces(storesGeoJson as FeatureCollection);
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
        <MapView style={styles.map}>
          {directions.length > 0 ? <Polyline coordinates={directions} /> : null}
          {places && <Geojson geojson={places} />}
        </MapView>
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
