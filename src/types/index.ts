// Tipos para la aplicación

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

export interface News {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  content: string;
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
  email?: string;
  phone?: string;
}

export interface Graduate {
  id: string;
  name: string;
  title: string;
  specialty: string;
  description: string;
  image: string;
}

export interface Program {
  id: string;
  name: string;
  code: string;
  duration: string;
  semesters: Semester[];
}

export interface Semester {
  number: number;
  courses: string[];
}

export interface ContactInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  department: string;
}
