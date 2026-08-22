import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Ensure this URL is set in your environment variables
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY; // Ensure this key is set in your environment variables

export const supabase = createClient(supabaseUrl, supabaseAnonKey);