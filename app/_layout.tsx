// WEB SUPPORT: Do this https://tamagui.dev/docs/guides/metro#web-support
// import '../tamagui-web.css'

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import {SplashScreen, Stack} from 'expo-router'
import { useColorScheme } from 'react-native'
import { TamaguiProvider } from 'tamagui'

import { tamaguiConfig } from '@/tamagui.config'
import {useFonts} from "expo-font";
import {useEffect} from "react";

export default function RootLayout() {
    const colorScheme = useColorScheme()

    // Prevent the splash screen from auto-hiding before asset loading is complete.
    SplashScreen.preventAutoHideAsync()

    const [interLoaded, interError] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    })

    useEffect(() => {
        if (interLoaded || interError) {
            // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
            SplashScreen.hideAsync()
        }
    }, [interLoaded, interError])

    if (!interLoaded && !interError) {
        return null
    }

    return (
        // add this
        <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack>
                    <Stack.Screen name="index" />
                </Stack>
            </ThemeProvider>
        </TamaguiProvider>
    )
}
