import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { getAffirmations, deleteAffirmation } from '@/lib/storage/affirmations';
import { Affirmation } from '@/types';
import { COLORS } from '@/lib/utils/constants';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function LibraryScreen() {
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      loadAffirmations();
    }
  }, [user]);

  const loadAffirmations = async () => {
    if (!user) return;
    try {
      const data = await getAffirmations(user.id);
      setAffirmations(data);
    } catch (error) {
      console.error('Failed to load affirmations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardPress = (affirmation: Affirmation) => {
    router.push({
      pathname: '/result',
      params: {
        affirmation: affirmation.text,
        prompt: affirmation.prompt,
        id: affirmation.id,
      },
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAffirmation(id);
      setAffirmations((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  if (loading) {
    return (
      <LinearGradient
        colors={[COLORS.lavender, COLORS.sky]}
        style={styles.container}
      >
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </LinearGradient>
    );
  }

  if (affirmations.length === 0) {
    return (
      <LinearGradient
        colors={[COLORS.lavender, COLORS.sky]}
        style={styles.container}
      >
        <View style={styles.centerContainer}>
          <View style={styles.orb}>
            <Ionicons name="sparkles" size={60} color={COLORS.gold} />
          </View>
          <Text style={styles.emptyTitle}>Your first light is waiting...</Text>
          <Text style={styles.emptySubtitle}>Generate one now</Text>
          <TouchableOpacity
            style={styles.generateButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.generateButtonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[COLORS.lavender, COLORS.sky]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Light Collection ✨</Text>
      </View>
      <FlatList
        data={affirmations}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <AffirmationCard
            affirmation={item}
            onPress={() => handleCardPress(item)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </LinearGradient>
  );
}

function AffirmationCard({
  affirmation,
  onPress,
  onDelete,
}: {
  affirmation: Affirmation;
  onPress: () => void;
  onDelete: () => void;
}) {
  const date = new Date(affirmation.created_at);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardText} numberOfLines={4}>
          {affirmation.text}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardDate}>{formattedDate}</Text>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            style={styles.deleteButton}
          >
            <Ionicons name="trash-outline" size={16} color="#999" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerText: {
    fontSize: 28,
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#FFFFFF',
  },
  list: {
    padding: 16,
    gap: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    margin: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    padding: 16,
    minHeight: 150,
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#2D2D2D',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
  deleteButton: {
    padding: 4,
  },
  orb: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 229, 180, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 32,
  },
  generateButton: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
  },
  generateButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    color: '#000',
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
});
