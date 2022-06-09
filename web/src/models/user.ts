export interface User{
  pk?: number;
  email?: string;
  username?: string;
  profile?: string|null;
  description?: string;
  updated?: string;
}

export interface UserState {
  user: User;
  error: any;
  loading: boolean;
};

export const InitUser: User = {
  pk: 0,
  email: "",
  username: "",
  profile: "",
  description: "",
  updated: ""
}

export const InitUserState: UserState = {
  user: InitUser,
  error: null,
  loading: false
}
