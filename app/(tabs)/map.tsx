import { useContext, useRef, useState } from "react";
import { Alert, Keyboard, StyleSheet, Text, View } from "react-native";
import MapView, { LatLng, Marker, Polyline } from "react-native-maps";

import Constants from "expo-constants";

import { Button, Input, XStack, YStack } from "tamagui";

import { SessionIdContext } from "@/app/_layout";
import StoreMarker from "@/components/map/StoreMarker";
import {
  mapboxCategorySearch,
  mapboxDirections,
  mapboxSearch,
} from "@/shared/mapbox.service";
import {
  SearchBoxCategoryResponse,
  SearchBoxFeatureSuggestion,
} from "@mapbox/search-js-core";

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
  const [fromText, setFromText] = useState<string>("");
  const [toText, setToText] = useState<string>("");
  const [fromMbx, setFromMbx] = useState<SearchBoxFeatureSuggestion | null>(
    null,
  );
  const [toMbx, setToMbx] = useState<SearchBoxFeatureSuggestion | null>(null);
  const [directions, setDirections] = useState<LatLng[]>([]);
  const [places, setPlaces] = useState<SearchBoxCategoryResponse | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const sessionId = useContext<string>(SessionIdContext);

  const handleSearch = async () => {
    Keyboard.dismiss();
    setFromMbx(null);
    setToMbx(null);
    setDirections([]);
    setPlaces(null);
    const { fromFeatures, toFeatures } = await mapboxSearch(
      fromText,
      toText,
      sessionId,
    );

    const nextFromMbx = fromFeatures[0];
    const nextToMbx = toFeatures[0];

    setFromMbx(nextFromMbx);
    setToMbx(nextToMbx);

    setFromText(
      `${nextFromMbx.properties.address}, ${nextFromMbx.properties.context.place?.name ?? ""} ${nextFromMbx.properties.context.postcode?.name ?? ""}`,
    );
    setToText(
      `${nextToMbx.properties.address}, ${nextToMbx.properties.context.place?.name ?? ""} ${nextToMbx.properties.context.postcode?.name ?? ""}`,
    );
    const fromCoordsObj = nextFromMbx.properties.coordinates;
    const toCoordsObj = nextToMbx.properties.coordinates;
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
    let storesGeoJson = await mapboxCategorySearch(polyline, 1);
    if (storesGeoJson.features.length < 3) {
      console.warn("No stores within 1 minute");
      storesGeoJson = await mapboxCategorySearch(polyline, 5);
    }
    if (storesGeoJson.features.length < 3) {
      Alert.alert(
        "Error",
        "No stores were found within a 5-minute drive of your route.",
      );
    }
    setPlaces(storesGeoJson);
  };

  return (
    <>
      <View style={styles.default}>
        <View style={styles.directionBox}>
          <YStack gap={"$2"}>
            <InputRow text="From" value={fromText} onChange={setFromText} />
            <InputRow text="To" value={toText} onChange={setToText} />
            <Button onPress={handleSearch}>Search</Button>
          </YStack>
        </View>
        <MapView
          style={styles.map}
          ref={mapRef}
          initialRegion={{
            latitude: 43.65107,
            longitude: -79.347015,
            latitudeDelta: 1.5,
            longitudeDelta: 1.5,
          }}
        >
          {fromMbx && (
            <Marker
              coordinate={{
                latitude: fromMbx.properties.coordinates.latitude,
                longitude: fromMbx.properties.coordinates.longitude,
              }}
              pinColor={"green"}
              key={fromMbx.properties.mapbox_id}
            />
          )}
          {toMbx && (
            <Marker
              coordinate={{
                latitude: toMbx.properties.coordinates.latitude,
                longitude: toMbx.properties.coordinates.longitude,
              }}
              pinColor={"wheat"}
              key={toMbx.properties.mapbox_id}
            />
          )}
          {directions.length > 0 ? (
            <Polyline
              coordinates={directions}
              strokeWidth={5}
              strokeColor={"rgba(0,102,255,0.75)"}
            />
          ) : null}
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
