import { Alert } from "react-native";
import { LatLng } from "react-native-maps";

import { MAPBOX_API_TOKEN } from "@/project.env";
import createNodeClient from "@mapbox/mapbox-sdk";
import { Coordinates } from "@mapbox/mapbox-sdk/lib/classes/mapi-request";
import Directions from "@mapbox/mapbox-sdk/services/directions";
import { SearchBoxCore, SessionToken } from "@mapbox/search-js-core";

export const mapboxSearch = async (
  fromText: string,
  toText: string,
  sessionId: string,
) => {
  const search = new SearchBoxCore({ accessToken: MAPBOX_API_TOKEN });
  const sessionToken = new SessionToken(sessionId);
  const fromResult = await search.suggest(fromText, { sessionToken });
  const toResult = await search.suggest(toText, { sessionToken });

  if (fromResult.suggestions.length < 1) {
    Alert.alert(
      "Error",
      "No results found for the 'from' location. Please try again.",
    );
  }
  if (toResult.suggestions.length < 1) {
    Alert.alert(
      "Error",
      "No results found for the 'to' location. Please try again.",
    );
  }

  const fromSuggestion = fromResult.suggestions[0];
  const toSuggestion = toResult.suggestions[0];

  const { features: fromFeatures } = await search.retrieve(fromSuggestion, {
    sessionToken,
  });
  const { features: toFeatures } = await search.retrieve(toSuggestion, {
    sessionToken,
  });

  return { fromFeatures, toFeatures };
};

export const mapboxDirections = async (
  fromLongLat: Coordinates,
  toLongLat: Coordinates,
) => {
  const mbxBaseClient = createNodeClient({ accessToken: MAPBOX_API_TOKEN });
  const mbxDirectionsService = Directions(mbxBaseClient);
  const directionsResPolyline = (
    await mbxDirectionsService
      .getDirections({
        profile: "driving",
        geometries: "polyline6",
        waypoints: [{ coordinates: fromLongLat }, { coordinates: toLongLat }],
      })
      .send()
  ).body;
  const directionsResGeoJSON = (
    await mbxDirectionsService
      .getDirections({
        profile: "driving",
        geometries: "geojson",
        waypoints: [{ coordinates: fromLongLat }, { coordinates: toLongLat }],
      })
      .send()
  ).body;
  const polylineRoute = directionsResPolyline.routes[0];
  const geoJsonRoute = directionsResGeoJSON.routes[0];
  const polyline = polylineRoute.geometry;
  const geoJson = geoJsonRoute.geometry;
  // Only take the first line (route)
  const geoJsonLine =
    geoJson.type === "MultiLineString"
      ? geoJson.coordinates[0]
      : geoJson.coordinates;

  const coords: LatLng[] = geoJsonLine.map((point) => ({
    longitude: point[0],
    latitude: point[1],
  }));

  return { polyline, coords };
};
