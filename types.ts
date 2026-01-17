
export interface Contact {
  id: number;
  name: string;
  phone: string;
  category?: string;
  address?: string;
}

export interface SearchHistory {
  query: string;
  timestamp: number;
}
