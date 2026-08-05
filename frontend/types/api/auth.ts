export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface SocialProofItem {
  val: string;
  lbl: string;
}

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export interface RegisteredUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AdminRegisterInput extends RegisterUserInput {
  code: string;
}
