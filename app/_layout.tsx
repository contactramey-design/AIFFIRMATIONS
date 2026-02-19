import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../global.css';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

// Use system fonts so web export works without font assets.
// To use custom fonts: add .ttf files to assets/fonts/ and uncomment below.
const customFonts: Record<string, unknown> = {};

export default function RootLayout() {
  const [loaded, error] = useFonts(customFonts);

  useEffect(() => {
    const timer = setTimeout(() => SplashScreen.hideAsync(), 500);
    if (loaded || error) clearTimeout(timer);
    return () => clearTimeout(timer);
  }, [loaded, error]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="generate" options={{ presentation: 'modal' }} />
          <Stack.Screen name="result" options={{ presentation: 'fullScreenModal' }} />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
