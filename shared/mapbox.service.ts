import { Alert } from "react-native";

import { MAPBOX_API_TOKEN } from "@/project.env";
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
