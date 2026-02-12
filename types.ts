
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'Dasar' | 'Sistem' | 'Nutrisi' | 'Teknologi';
  duration: string;
  icon: string;
  videoUrl?: string;
  quiz: QuizQuestion[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export enum CurriculumModule {
  BASICS = 'Pengenalan Hidroponik',
  SYSTEMS = 'Sistem Hidroponik Modern',
  NUTRIENTS = 'Manajemen Nutrisi & pH',
  IRRIGATION = 'Pengairan Otomatis (Smart Irrigation)',
  HARVEST = 'Panen & Pasca Panen'
}
