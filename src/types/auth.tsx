export interface BookType {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  title?: string;
  description?: string;
  image?: string;
  published?: string;
  author?: string;
  authorId?: string;
  price?: string;
  email?: string;
}

export interface UserType {
  id?: string;
  email: string;
  password: string;
  role: RoleType;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface SignUpType {
  email: string;
  password: string;
  role: RoleType; // Now correctly references the RoleType enum
}

export enum RoleType {
  USER = "USER",
  ADMIN = "ADMIN",
}
