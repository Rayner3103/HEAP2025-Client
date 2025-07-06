export interface _User {
  userId?: string,
  name?: string,
  age?: number,
  gender?: Gender,
  nationality?: Nationality,
  email?: string,
  organisation?: string,
  role?: Role,
  teleUsername?: string,
  interests?: Array<string>;
}

export interface User {
  userId: string,
  name: string,
  age: number,
  gender: Gender,
  nationality: Nationality,
  email: string,
  organisation: string,
  role: Role,
  teleUsername: string,
  interests: Array<string>
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export enum Nationality {
  CITIZEN = 'Citizen',
  RESIDENT = 'Resident',
  OTHERS = 'Others'
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  ORGANISER = 'organiser'
}