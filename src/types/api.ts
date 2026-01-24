// API Types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
