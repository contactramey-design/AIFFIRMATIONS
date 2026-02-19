import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useFreeTier } from '@/hooks/useFreeTier';
import { getAffirmations } from '@/lib/storage/affirmations';
import { COLORS, FREE_TIER_LIMIT, GRADIENTS, TEXT_SHADOW_LIGHT } from '@/lib/utils/constants';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { usageCount, canGenerate, remaining, limit } = useFreeTier(user?.id);
  const [showPaywall, setShowPaywall] = useState(false);
  const [totalAffirmations, setTotalAffirmations] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    if (!user) return;
    try {
      const affirmations = await getAffirmations(user.id);
      setTotalAffirmations(affirmations.length);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handlePurchase = () => {
    // RevenueCat integration will go here
    setShowPaywall(false);
  };

  return (
    <LinearGradient
      colors={GRADIENTS.strong}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={COLORS.gold} />
          </View>
          <Text style={styles.name}>
            {user?.user_metadata?.name || 'Friend'}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalAffirmations}</Text>
            <Text style={styles.statLabel}>Lights Created</Text>
          </View>
        </View>

        {!canGenerate && (
          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={() => setShowPaywall(true)}
          >
            <Text style={styles.upgradeButtonText}>Unlock Unlimited ✨</Text>
          </TouchableOpacity>
        )}

        {canGenerate && (
          <View style={styles.freeTierInfo}>
            <Text style={styles.freeTierText}>
              {remaining} free generations remaining
            </Text>
          </View>
        )}

        <View style={styles.settingsContainer}>
          <TouchableOpacity style={styles.settingsItem}>
            <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
            <Text style={styles.settingsText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsItem}>
            <Ionicons name="moon-outline" size={24} color="#FFFFFF" />
            <Text style={styles.settingsText}>Theme</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsItem} onPress={signOut}>
            <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
            <Text style={styles.settingsText}>Sign Out</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <PaywallModal
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        onPurchase={handlePurchase}
      />
    </LinearGradient>
  );
}

function PaywallModal({
  visible,
  onClose,
  onPurchase,
}: {
  visible: boolean;
  onClose: () => void;
  onPurchase: () => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Unlock unlimited light</Text>

          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={24} color={COLORS.gold} />
              <Text style={styles.benefitText}>Unlimited generations</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={24} color={COLORS.gold} />
              <Text style={styles.benefitText}>Save & share forever</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={24} color={COLORS.gold} />
              <Text style={styles.benefitText}>Premium support</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.purchaseButton}
            onPress={onPurchase}
          >
            <Text style={styles.purchaseButtonText}>$0.99/month</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.purchaseButtonYearly}
            onPress={onPurchase}
          >
            <Text style={styles.purchaseButtonText}>$9.99/year</Text>
          </TouchableOpacity>

          <Text style={styles.cancelText}>Cancel anytime</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 229, 180, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#FFFFFF',
    ...TEXT_SHADOW_LIGHT,
  },
  statsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 48,
    fontFamily: 'PlayfairDisplay-Regular',
    color: COLORS.gold,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    ...TEXT_SHADOW_LIGHT,
  },
  upgradeButton: {
    backgroundColor: COLORS.gold,
    marginHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 24,
  },
  upgradeButtonText: {
    fontSize: 20,
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    color: '#000',
  },
  freeTierInfo: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
  },
  freeTierText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    ...TEXT_SHADOW_LIGHT,
  },
  settingsContainer: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 15,
    marginBottom: 12,
    gap: 16,
  },
  settingsText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    ...TEXT_SHADOW_LIGHT,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 32,
    width: '100%',
    maxWidth: 400,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
  modalTitle: {
    fontSize: 28,
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
  },
  benefitsList: {
    marginBottom: 32,
    gap: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#2D2D2D',
  },
  purchaseButton: {
    backgroundColor: COLORS.gold,
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
  },
  purchaseButtonYearly: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: COLORS.gold,
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 16,
  },
  purchaseButtonText: {
    fontSize: 20,
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    color: '#000',
  },
  cancelText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#999',
    textAlign: 'center',
  },
});
