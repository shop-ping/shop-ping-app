import { useContext, useRef, useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import MapView, { LatLng, Polyline } from "react-native-maps";

import Constants from "expo-constants";

import { Button, Input, XStack, YStack } from "tamagui";

import { SessionIdContext } from "@/app/_layout";
import StoreMarker from "@/components/map/StoreMarker";
import {
  mapboxCategorySearch,
  mapboxDirections,
  mapboxSearch,
} from "@/shared/mapbox.service";
import { SearchBoxCategoryResponse } from "@mapbox/search-js-core";

interface InputRowProps {
  text: string;
  value: string;
  onChange: (next: string) => void;
}

function InputRow({ text, value, onChange }: InputRowProps) {
  return (
    <XStack gap={"$2"} style={styles.inputRow}>
      <Text style={styles.inputRowText}>{text}</Text>
      <Input
        style={styles.input}
        value={value}
        onChangeText={onChange}
        numberOfLines={1}
      />
    </XStack>
  );
}

export default function MapScreen() {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [directions, setDirections] = useState<LatLng[]>([]);
  const [places, setPlaces] = useState<SearchBoxCategoryResponse | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const sessionId = useContext<string>(SessionIdContext);

  const handleSearch = async () => {
    Keyboard.dismiss();
    setDirections([]);
    const { fromFeatures, toFeatures } = await mapboxSearch(
      from,
      to,
      sessionId,
    );
    console.log(JSON.stringify(fromFeatures[0]));
    setFrom(
      `${fromFeatures[0].properties.address}, ${fromFeatures[0].properties.context.place?.name ?? ""} ${fromFeatures[0].properties.context.postcode?.name ?? ""}`,
    );
    setTo(
      `${toFeatures[0].properties.address}, ${toFeatures[0].properties.context.place?.name ?? ""} ${toFeatures[0].properties.context.postcode?.name ?? ""}`,
    );
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
    mapRef.current?.fitToCoordinates(coords, {
      animated: true,
      edgePadding: { top: 70, right: 10, bottom: 10, left: 10 },
    });
    const storesGeoJson = await mapboxCategorySearch(polyline);
    setPlaces(storesGeoJson);
    console.log(JSON.stringify(storesGeoJson));
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
        <MapView style={styles.map} ref={mapRef}>
          {directions.length > 0 ? <Polyline coordinates={directions} /> : null}
          {places &&
            places.features.map((feature) => (
              <StoreMarker
                feature={feature}
                key={feature.properties.mapbox_id}
              />
            ))}
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
    position: "absolute",
    left: 0,
    top: Constants.statusBarHeight,
    zIndex: 10,
    backgroundColor: "white",
    width: "100%",
    padding: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginLeft: "auto",
  },
  input: {
    flex: 6,
    flexGrow: 6,
    overflow: "hidden",
  },
  inputRowText: {
    flex: 1,
  },
});
