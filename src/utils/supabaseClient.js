import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://warwscriycrmnnypmcka.supabase.co';
const supabaseAnonKey = 'sb_publishable_BmYlJqNsOH82IGxHOaUSeQ_-hxKXmHA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);