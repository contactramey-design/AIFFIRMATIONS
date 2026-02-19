import { useState, useEffect } from 'react';
import { getUsageCount } from '@/lib/storage/affirmations';
import { FREE_TIER_LIMIT } from '@/lib/utils/constants';

export function useFreeTier(userId: string | undefined) {
  const [usageCount, setUsageCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    getUsageCount(userId).then((count) => {
      setUsageCount(count);
      setLoading(false);
    });
  }, [userId]);

  const canGenerate = usageCount < FREE_TIER_LIMIT;
  const remaining = Math.max(0, FREE_TIER_LIMIT - usageCount);

  return {
    usageCount,
    canGenerate,
    remaining,
    limit: FREE_TIER_LIMIT,
    loading,
    incrementUsage: () => setUsageCount((prev) => prev + 1),
  };
}
