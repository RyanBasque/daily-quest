import type { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse,
  User 
} from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class AuthService {
  private token: string | null = null;

  constructor() {
    // Load token from localStorage on initialization (client-side only)
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('access_token');
    }
  }

  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao registrar usuário');
    }

    return response.json();
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Credenciais inválidas');
    }

    const result: LoginResponse = await response.json();
    
    // Store only token (not user data for security)
    this.setToken(result.access_token);

    return result;
  }

  /**
   * Get user profile
   */
  async getProfile(): Promise<User> {
    if (!this.token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.logout();
        throw new Error('Sessão expirada');
      }
      throw new Error('Erro ao buscar perfil');
    }

    return response.json();
  }

  /**
   * Logout user
   */
  logout(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.token;
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Set token
   */
  private setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
