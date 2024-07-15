import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Svg, { Circle, Path, Text } from "react-native-svg";

export default function StoreMarker() {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    setNumber(Math.floor(Math.random() * 13 + 8));
  }, []);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg height="60" width="40" viewBox="-2.5 -2.5 45 65">
        <Path
          d="M20 0 C30 0 40 10 40 20 C40 30 20 60 20 60 C20 60 0 30 0 20 C0 10 10 0 20 0 Z"
          fill="#DB4437"
          stroke="#C0392B"
          strokeWidth="2.5"
        />
        <Circle cx="20" cy="20" r="10" fill="white" />
        <Text
          x="20"
          y="25"
          textAnchor="middle"
          fontSize="13"
          fill="black"
          fontWeight="bold"
        >
          {number}
        </Text>
      </Svg>
    </View>
  );
}
