/**
 * User Types
 */

export interface IUser {
  id: string | number;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateUserRequest {
  email: string;
  name: string;
  password?: string;
  role?: string;
}

export interface IUpdateUserRequest {
  email?: string;
  name?: string;
  avatar?: string;
  role?: string;
}

export interface IUserProfile extends IUser {
  bio?: string;
  phone?: string;
  address?: string;
}
