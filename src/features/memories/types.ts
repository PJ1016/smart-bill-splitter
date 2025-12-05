export interface Memory {
  id: string;
  placeName: string;
  city: string;
  category: 'Food' | 'Stay' | 'Sightseeing' | 'Other';
  notes: string;
  imageUrl: string;
  createdAt: string;
}

export interface ExtractedData {
  placeName: string;
  city: string;
  category: string;
  notes: string;
}

export interface UploadResponse {
  imageUrl: string;
}

export interface CreateMemoryRequest {
  placeName: string;
  city: string;
  category: string;
  notes: string;
  imageUrl: string;
}

export interface ChatResponse {
  responseText: string;
  matches: Memory[];
}