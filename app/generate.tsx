import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { generateAffirmation } from '@/lib/supabase/functions';
import { useAuth } from '@/hooks/useAuth';
import { useFreeTier } from '@/hooks/useFreeTier';
import { COLORS } from '@/lib/utils/constants';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export default function GenerateScreen() {
  const { prompt } = useLocalSearchParams<{ prompt: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { canGenerate, incrementUsage } = useFreeTier(user?.id);
  const [loading, setLoading] = useState(true);
  const [affirmation, setAffirmation] = useState<string>('');
  const [error, setError] = useState<string>('');

  const ringScale = useSharedValue(1);
  const ringOpacity = useSharedValue(0.5);

  const animatedRing = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));

  useEffect(() => {
    if (!canGenerate) {
      router.replace('/(tabs)/profile');
      return;
    }

    ringScale.value = withRepeat(
      withTiming(1.2, { duration: 1500 }),
      -1,
      true
    );
    ringOpacity.value = withRepeat(
      withTiming(0.8, { duration: 1500 }),
      -1,
      true
    );

    generateAffirmation(prompt || '')
      .then((text) => {
        setAffirmation(text);
        setLoading(false);
        incrementUsage();
      })
      .catch((err) => {
        setError(err.message || 'Failed to generate affirmation');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (affirmation && !loading) {
      router.replace({
        pathname: '/result',
        params: { affirmation, prompt: prompt || '' },
      });
    }
  }, [affirmation, loading]);

  if (loading) {
    return (
      <LinearGradient
        colors={[COLORS.lavender, COLORS.sky]}
        style={styles.container}
      >
        <View style={styles.loadingContainer}>
          <Animated.View style={[styles.ring, animatedRing]} />
          <ActivityIndicator size="large" color={COLORS.gold} />
          <Text style={styles.loadingText}>Crafting your light...</Text>
        </View>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient
        colors={[COLORS.lavender, COLORS.sky]}
        style={styles.container}
      >
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </LinearGradient>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: COLORS.gold,
  },
  loadingText: {
    marginTop: 24,
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
