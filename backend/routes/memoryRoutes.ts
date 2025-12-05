import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { 
  uploadImage, 
  extractDetails, 
  saveMemory, 
  getMemories, 
  chatQuery 
} from '../controllers/memoryController.js';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Routes
router.post('/upload', upload.single('image'), uploadImage);
router.post('/extract', extractDetails);
router.post('/memories', saveMemory);
router.get('/memories', getMemories);
router.post('/chat', chatQuery);

export default router;