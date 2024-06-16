// WEB SUPPORT: Do this https://tamagui.dev/docs/guides/metro#web-support
// import '../tamagui-web.css'
import { useEffect } from "react";
import { useColorScheme } from "react-native";

import {
  // DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";

import { tamaguiConfig } from "@/tamagui.config";
import InterBold from "@tamagui/font-inter/otf/Inter-Bold.otf";
import InterMedium from "@tamagui/font-inter/otf/Inter-Medium.otf";
import { TamaguiProvider } from "tamagui";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Prevent the splash screen from auto-hiding before asset loading is complete.
  void SplashScreen.preventAutoHideAsync();

  const [interLoaded, interError] = useFonts({
    Inter: InterMedium,
    InterBold: InterBold,
  });

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      void SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return (
    // add this
    <TamaguiProvider
      config={tamaguiConfig}
      defaultTheme={colorScheme ?? "light"}
    >
      {/*<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>*/}
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
