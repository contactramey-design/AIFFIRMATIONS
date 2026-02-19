import { supabase } from './client';
import { AI_SYSTEM_PROMPT } from '@/lib/utils/constants';

export async function generateAffirmation(prompt: string): Promise<string> {
  const { data, error } = await supabase.functions.invoke('generate-affirmation', {
    body: { prompt, systemPrompt: AI_SYSTEM_PROMPT },
  });

  if (error) {
    throw new Error(error.message || 'Failed to generate affirmation');
  }

  return data.affirmation;
}
