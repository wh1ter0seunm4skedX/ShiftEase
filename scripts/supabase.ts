import { createClient } from '@supabase/supabase-js';
import { config } from './config';

if (!config.supabaseUrl || !config.supabaseAnonKey) {
  throw new Error('Missing Supabase credentials. Please check your .env file.');
}

export const supabase = createClient(
  config.supabaseUrl,
  config.supabaseAnonKey
);
