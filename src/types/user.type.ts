export interface User {
  id: number;
  username: string;
  display_name: string;
  email: string;
  avatar_url: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
