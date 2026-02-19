import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { PromptInput } from '@/components/home/PromptInput';
import { CategoryChips } from '@/components/home/CategoryChips';
import { COLORS, CATEGORIES } from '@/lib/utils/constants';
import { CategoryId } from '@/types';

export default function HomeScreen() {
  const [prompt, setPrompt] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    router.push({
      pathname: '/generate',
      params: { prompt },
    });
  };

  const handleCategorySelect = (categoryId: CategoryId) => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    if (category) {
      setPrompt(`I need support for ${category.label.toLowerCase()}...`);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <LinearGradient
      colors={[COLORS.lavender, COLORS.sky]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.greeting}>
          {getGreeting()}, {user?.user_metadata?.name || 'friend'} ✨
        </Text>

        <PromptInput
          value={prompt}
          onChangeText={setPrompt}
          placeholder="What do you need light for today? e.g. nervous about my big presentation..."
        />

        <CategoryChips onSelect={handleCategorySelect} />

        <TouchableOpacity
          style={[styles.generateButton, !prompt.trim() && styles.generateButtonDisabled]}
          onPress={handleGenerate}
          disabled={!prompt.trim()}
        >
          <Text style={styles.generateButtonText}>Generate</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 8,
  },
  generateButton: {
    backgroundColor: COLORS.gold,
    marginHorizontal: 24,
    marginTop: 32,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  generateButtonDisabled: {
    opacity: 0.5,
  },
  generateButtonText: {
    fontSize: 20,
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    color: '#000',
  },
});
