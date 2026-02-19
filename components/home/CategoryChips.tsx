import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { CATEGORIES } from '@/lib/utils/constants';
import { CategoryId } from '@/types';

interface CategoryChipsProps {
  onSelect: (category: CategoryId) => void;
}

export function CategoryChips({ onSelect }: CategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      {CATEGORIES.map((category) => (
        <CategoryChip
          key={category.id}
          category={category}
          onPress={() => onSelect(category.id)}
        />
      ))}
    </ScrollView>
  );
}

function CategoryChip({
  category,
  onPress,
}: {
  category: typeof CATEGORIES[number];
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const brightness = useSharedValue(0.8);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: brightness.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
    brightness.value = withSpring(1);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    brightness.value = withSpring(0.8);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.chip, animatedStyle]}>
        <Text style={styles.emoji}>{category.emoji}</Text>
        <Text style={styles.label}>{category.label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 24,
  },
  container: {
    paddingHorizontal: 24,
    gap: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FFE5B4',
    gap: 8,
  },
  emoji: {
    fontSize: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D2D2D',
  },
});
