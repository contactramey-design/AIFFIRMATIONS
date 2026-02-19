import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { COLORS } from '@/lib/utils/constants';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();
  const { signInWithApple, signInWithGoogle } = useAuth();

  const pulse = useSharedValue(1);
  const sparkleOpacity = useSharedValue(0.3);

  const animatedPulse = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const animatedSparkle = useAnimatedStyle(() => ({
    opacity: sparkleOpacity.value,
  }));

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1.1, { duration: 1000 }),
      -1,
      true
    );
    sparkleOpacity.value = withRepeat(
      withTiming(0.6, { duration: 2000 }),
      -1,
      true
    );
  }, []);

  const handleNext = () => {
    if (currentSlide < 2) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      scrollViewRef.current?.scrollTo({
        x: nextSlide * width,
        animated: true,
      });
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const handleAuth = async (provider: 'apple' | 'google') => {
    if (provider === 'apple') {
      await signInWithApple();
    } else {
      await signInWithGoogle();
    }
    router.replace('/(tabs)');
  };

  const slides = [
    {
      headline: 'Welcome to LumiAffirm ✨',
      subtitle: 'Your pocket light — AI affirmations that actually get you.',
    },
    {
      headline: 'How it works',
      body: "Tell me anything... I'll craft a glowing, personal affirmation just for you",
      icons: ['keyboard-outline', 'sparkles', 'heart'],
    },
    {
      headline: 'Ready to feel the light?',
    },
  ];

  return (
    <LinearGradient
      colors={[COLORS.lavender, COLORS.sky]}
      style={styles.container}
    >
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const slide = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentSlide(slide);
        }}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            {index === 0 && (
              <View style={styles.content}>
                <Text style={styles.headline}>{slide.headline}</Text>
                <Text style={styles.subtitle}>{slide.subtitle}</Text>
              </View>
            )}

            {index === 1 && (
              <View style={styles.content}>
                <Animated.View style={[styles.orb, animatedPulse]}>
                  <Ionicons name="sparkles" size={60} color={COLORS.gold} />
                </Animated.View>
                <Text style={styles.headline}>{slide.headline}</Text>
                <Text style={styles.body}>{slide.body}</Text>
                <View style={styles.iconRow}>
                  {slide.icons?.map((icon, i) => (
                    <Animated.View
                      key={i}
                      style={[styles.iconContainer, animatedSparkle]}
                    >
                      <Ionicons
                        name={icon as any}
                        size={32}
                        color={COLORS.gold}
                      />
                    </Animated.View>
                  ))}
                </View>
              </View>
            )}

            {index === 2 && (
              <View style={styles.content}>
                <Text style={styles.headline}>{slide.headline}</Text>
                <TouchableOpacity
                  style={styles.authButton}
                  onPress={() => handleAuth('apple')}
                >
                  <Ionicons name="logo-apple" size={24} color="#000" />
                  <Text style={styles.authButtonText}>Continue with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.authButton, styles.googleButton]}
                  onPress={() => handleAuth('google')}
                >
                  <Ionicons name="logo-google" size={24} color="#000" />
                  <Text style={styles.authButtonText}>Continue with Google</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentSlide === index && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {currentSlide < 2 && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Animated.View style={animatedPulse}>
            <Text style={styles.nextButtonText}>Next</Text>
          </Animated.View>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    color: COLORS.gold,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    fontSize: 36,
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  body: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.8,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  orb: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 229, 180, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  iconRow: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 30,
  },
  iconContainer: {
    padding: 12,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  dotActive: {
    backgroundColor: COLORS.gold,
    width: 24,
  },
  nextButton: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
  },
  nextButtonText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gold,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: width - 80,
    marginTop: 16,
    gap: 12,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
  },
  authButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    color: '#000',
  },
});
