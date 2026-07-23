import { UserRole, UserStatus } from '../constants/roles';

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddress {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

export interface IPublicUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}
