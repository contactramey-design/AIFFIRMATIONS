import { View, TextInput, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { COLORS } from '@/lib/utils/constants';

interface PromptInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function PromptInput({
  value,
  onChangeText,
  placeholder = 'What do you need light for today?',
}: PromptInputProps) {
  const glowOpacity = useSharedValue(0);

  const animatedGlow = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const handleFocus = () => {
    glowOpacity.value = withTiming(1, { duration: 300 });
  };

  const handleBlur = () => {
    glowOpacity.value = withTiming(0, { duration: 300 });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.glow, animatedGlow]} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: 32,
    position: 'relative',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    minHeight: 120,
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  glow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 22,
    backgroundColor: COLORS.gold,
    opacity: 0.3,
  },
});
