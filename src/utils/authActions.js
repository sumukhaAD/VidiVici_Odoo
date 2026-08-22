import { supabase } from './supabaseClient.js';

// 1. Google Sign-In Function
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    // Optional: Redirect to the dashboard after login
    options: {
      redirectTo: `${window.location.origin}/` 
    }
  });
  
  if (error) {
    console.error("Google login error:", error.message);
    throw error;
  }
  return data;
}

// 2. Standard Email/Password Login Function
export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Login error:", error.message);
    throw error;
  }
  return data;
}

// 3. Log Out Function
export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}