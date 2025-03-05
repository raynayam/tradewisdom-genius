import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

class AuthService {
  private user: User | null = null;

  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    this.user = data.user;
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    this.user = data.user;
    return data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    this.user = null;
  }

  async getCurrentUser() {
    if (this.user) {
      return this.user;
    }

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      throw error;
    }

    this.user = user;
    return user;
  }

  isAuthenticated() {
    return !!this.user;
  }
}

export const authService = new AuthService(); 