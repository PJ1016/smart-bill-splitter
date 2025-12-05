# Travel Memory Hub - API Integration

## 🚀 Backend Setup

### Installation
```bash
cd backend
npm install
npm run dev
```

### API Endpoints

#### 1. Upload Image
```
POST /api/upload
Content-Type: multipart/form-data
Body: FormData with 'image' field
Response: { imageUrl: string }
```

#### 2. Extract Details
```
POST /api/extract
Body: { imageUrl: string }
Response: { placeName, city, category, notes }
```

#### 3. Save Memory
```
POST /api/memories
Body: { placeName, city, category, notes, imageUrl }
Response: Memory object with id and createdAt
```

#### 4. Get Memories
```
GET /api/memories
Response: Memory[]
```

#### 5. Search Memories
```
GET /api/memories?search=query
Response: Memory[]
```

#### 6. Chat Query
```
POST /api/chat
Body: { message: string }
Response: { responseText, matches: Memory[] }
```

## 🔧 Frontend Integration

### RTK Query Hooks

```typescript
// Upload and extract
const [uploadImage] = useUploadImageMutation();
const [extractDetails] = useExtractDetailsMutation();

// Memory management
const [saveMemory] = useSaveMemoryMutation();
const { data: memories } = useGetMemoriesQuery();
const { data: searchResults } = useSearchMemoriesQuery(searchTerm);

// Chat
const [chatQuery] = useChatQueryMutation();
```

### Usage Examples

#### AddMemory Component
```typescript
const handleFileSelect = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const uploadResult = await uploadImage(formData).unwrap();
  const extractResult = await extractDetails({ 
    imageUrl: uploadResult.imageUrl 
  }).unwrap();
  
  setMemoryData(extractResult);
};

const handleSave = async () => {
  await saveMemory({
    ...memoryData,
    imageUrl
  }).unwrap();
};
```

#### Memories Component
```typescript
const { data: memories = [], isLoading } = useGetMemoriesQuery();
const { data: searchResults = [] } = useSearchMemoriesQuery(searchTerm, {
  skip: !searchTerm.trim()
});
```

#### Chat Component
```typescript
const [chatQuery] = useChatQueryMutation();

const handleSendMessage = async () => {
  const response = await chatQuery({ message }).unwrap();
  // response.responseText and response.matches
};
```

## 🏗️ Architecture

### Backend Structure
```
backend/
├── server.ts              # Express server setup
├── routes/
│   └── memoryRoutes.ts    # API routes
├── controllers/
│   └── memoryController.ts # Business logic
├── storage.ts             # In-memory data storage
└── uploads/               # Uploaded images
```

### Frontend Structure
```
src/features/memories/
├── memoriesApi.ts         # RTK Query API slice
├── types.ts              # TypeScript interfaces
└── store.ts              # Redux store configuration
```

## 🔄 Data Flow

1. **Upload**: File → FormData → Backend → Image URL
2. **Extract**: Image URL → OCR API → Extracted data
3. **Save**: Form data + Image URL → Backend storage
4. **Display**: RTK Query → Cached data → UI
5. **Search**: Query string → Filtered results
6. **Chat**: Message → Memory search → AI response

## 🎯 Key Features

- **Automatic caching** with RTK Query
- **Optimistic updates** for better UX  
- **Error handling** with try/catch
- **Loading states** for all operations
- **Type safety** with TypeScript
- **File upload** with multer
- **In-memory storage** for MVP