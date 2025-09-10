
export enum Role {
  None,
  Researcher,
  User,
}

export interface TaxonomyData {
  name: string;
  value: number;
}

export interface Species {
  id: number;
  name: string;
  class: string;
  description: string;
  imageUrl: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type Language = 'en' | 'hi';
