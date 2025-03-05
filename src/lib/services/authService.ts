import { AuthResponse, SignInData, SignUpData, User } from '@/types/auth';

class AuthService {
  private baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  private tokenKey = 'auth_token';
  private userKey = 'user_data';

  async signUp(data: SignUpData): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to sign up');
    }

    const authData = await response.json();
    this.setToken(authData.token);
    this.setUser(authData.user);
    return authData;
  }

  async signIn(data: SignInData): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to sign in');
    }

    const authData = await response.json();
    this.setToken(authData.token);
    this.setUser(authData.user);
    return authData;
  }

  async signOut(): Promise<void> {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): User | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
}

export const authService = new AuthService(); 