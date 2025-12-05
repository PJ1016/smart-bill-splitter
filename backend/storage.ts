// In-memory storage for MVP
export interface Memory {
  id: string;
  placeName: string;
  city: string;
  category: 'Food' | 'Stay' | 'Sightseeing' | 'Other';
  notes: string;
  imageUrl: string;
  createdAt: string;
}

export class MemoryStorage {
  private memories: Memory[] = [];

  save(memory: Omit<Memory, 'id' | 'createdAt'>): Memory {
    const newMemory: Memory = {
      ...memory,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    this.memories.unshift(newMemory);
    return newMemory;
  }

  getAll(): Memory[] {
    return [...this.memories];
  }

  search(query: string): Memory[] {
    const searchTerm = query.toLowerCase();
    return this.memories.filter(memory =>
      memory.placeName.toLowerCase().includes(searchTerm) ||
      memory.city.toLowerCase().includes(searchTerm) ||
      memory.notes.toLowerCase().includes(searchTerm) ||
      memory.category.toLowerCase().includes(searchTerm)
    );
  }
}

export const memoryStorage = new MemoryStorage();