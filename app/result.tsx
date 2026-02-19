import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { COLORS } from '@/lib/utils/constants';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { saveAffirmation } from '@/lib/storage/affirmations';
import { useAuth } from '@/hooks/useAuth';

export default function ResultScreen() {
  const { affirmation, prompt, id } = useLocalSearchParams<{
    affirmation: string;
    prompt?: string;
    id?: string;
  }>();
  const router = useRouter();
  const { user } = useAuth();
  const [saved, setSaved] = useState(!!id);

  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSequence(
      withSpring(1.1, { damping: 8 }),
      withSpring(1, { damping: 8 })
    );
    opacity.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleSave = async () => {
    if (!user || !affirmation || saved) return;
    try {
      await saveAffirmation(user.id, prompt || '', affirmation);
      setSaved(true);
    } catch (err) {
      console.error('Failed to save:', err);
    }
  };

  const handleShare = () => {
    // View-shot implementation will go here
    console.log('Share functionality');
  };

  const handleNewPrompt = () => {
    router.back();
  };

  return (
    <LinearGradient
      colors={[COLORS.lavender, COLORS.sky]}
      style={styles.container}
    >
      <Animated.View style={[styles.card, animatedStyle]}>
        <View style={styles.cardContent}>
          <Text style={styles.affirmationText}>{affirmation}</Text>
          <Text style={styles.signature}>— Lumi, your light guide</Text>
        </View>

        <View style={styles.buttonRow}>
          {!saved && (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Ionicons name="heart-outline" size={20} color="#000" />
              <Text style={styles.buttonText}>Save to Library</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Ionicons name="share-outline" size={20} color="#000" />
            <Text style={styles.buttonText}>Share as Story</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.newPromptButton}
          onPress={handleNewPrompt}
        >
          <Text style={styles.newPromptText}>Create New Light</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  cardContent: {
    marginBottom: 32,
  },
  affirmationText: {
    fontSize: 28,
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#2D2D2D',
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: 24,
  },
  signature: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: COLORS.gold,
    textAlign: 'center',
  },
  buttonRow: {
    gap: 12,
    marginBottom: 16,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gold,
    paddingVertical: 16,
    borderRadius: 25,
    gap: 8,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gold,
    paddingVertical: 16,
    borderRadius: 25,
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    color: '#000',
  },
  newPromptButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  newPromptText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
});
