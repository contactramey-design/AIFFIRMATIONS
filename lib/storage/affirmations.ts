import { supabase } from '@/lib/supabase/client';
import { Affirmation } from '@/types';

export async function saveAffirmation(
  userId: string,
  prompt: string,
  text: string
): Promise<Affirmation> {
  const { data, error } = await supabase
    .from('affirmations')
    .insert({
      user_id: userId,
      prompt,
      text,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAffirmations(userId: string): Promise<Affirmation[]> {
  const { data, error } = await supabase
    .from('affirmations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function deleteAffirmation(id: string): Promise<void> {
  const { error } = await supabase.from('affirmations').delete().eq('id', id);
  if (error) throw error;
}

export async function getUsageCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from('affirmations')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (error) throw error;
  return count || 0;
}
