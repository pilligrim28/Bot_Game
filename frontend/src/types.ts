export interface Poster {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  bookingUrl?: string;
  createdAt: Date;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  bookingUrl?: string;
  createdAt: Date;
}

export interface Promo {
  id: number;
  code: string;
  createdAt: Date;
}