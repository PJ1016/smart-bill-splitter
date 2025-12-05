import { Request, Response } from 'express';
import { memoryStorage } from '../storage.js';

export const uploadImage = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
};

export const extractDetails = (req: Request, res: Response) => {
  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    // Mock OCR extraction with random data
    const mockData = [
      { placeName: 'Hawa Mahal', city: 'Jaipur', category: 'Sightseeing', notes: 'Amazing view from top!' },
      { placeName: 'Laxmi Mishthan Bhandar', city: 'Jaipur', category: 'Food', notes: 'Famous for Ghevar and sweets' },
      { placeName: 'Hotel Pearl Palace', city: 'Jaipur', category: 'Stay', notes: 'Comfortable heritage hotel' },
      { placeName: 'Amber Fort', city: 'Jaipur', category: 'Sightseeing', notes: 'Magnificent Rajput architecture' },
    ];
    
    const randomData = mockData[Math.floor(Math.random() * mockData.length)];
    
    // Simulate processing delay
    setTimeout(() => {
      res.json(randomData);
    }, 1500);
  } catch (error) {
    res.status(500).json({ error: 'Extraction failed' });
  }
};

export const saveMemory = (req: Request, res: Response) => {
  try {
    const { placeName, city, category, notes, imageUrl } = req.body;
    
    if (!placeName || !city || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const memory = memoryStorage.save({
      placeName,
      city,
      category,
      notes: notes || '',
      imageUrl: imageUrl || '',
    });

    res.status(201).json(memory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save memory' });
  }
};

export const getMemories = (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    
    if (search && typeof search === 'string') {
      const results = memoryStorage.search(search);
      return res.json(results);
    }
    
    const memories = memoryStorage.getAll();
    res.json(memories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch memories' });
  }
};

export const chatQuery = (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Simple keyword matching for chat
    const memories = memoryStorage.search(message);
    
    const responseText = memories.length > 0 
      ? `I found ${memories.length} memories matching "${message}":`
      : `No memories found for "${message}". Try searching for places, cities, or activities!`;

    res.json({
      responseText,
      matches: memories.slice(0, 5), // Limit to 5 results
    });
  } catch (error) {
    res.status(500).json({ error: 'Chat query failed' });
  }
};