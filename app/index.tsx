import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || loading) return;

    // Add small delay to ensure router is ready
    const timer = setTimeout(() => {
      try {
        if (user) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)/onboarding');
        }
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [user, loading, mounted, router]);

  // Show loading screen instead of blank
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#D4AF37" />
      <Text style={styles.text}>Loading LumiAffirm...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0E6FF',
  },
  text: {
    marginTop: 20,
    color: '#666',
    fontSize: 16,
  },
});
