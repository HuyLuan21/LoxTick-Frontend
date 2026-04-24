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
  is_following?: boolean;
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
export interface FollowingList {
  following_user_id: number;
  display_name: string;
  avatar_url: string;
  username: string;
}
