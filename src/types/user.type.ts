export interface User {
  id: number;
  username: string;
  display_name: string;
  email: string;
  avatar_url: string;
  bio?: string;
  role: string;
  is_loading: boolean;
}

export interface UserProfile extends User {
  followers?: number;
  following?: number;
  likes?: number;
}

export interface UpdateProfilePayload {
  username?: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
