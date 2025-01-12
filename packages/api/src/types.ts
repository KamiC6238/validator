export interface Skills {
  piano: boolean;
  running: boolean;
  swimming: boolean;
}

export interface Person {
  age: number;
  firstName: string;
  lastName: string;
  sex?: string
  skills: Skills
}