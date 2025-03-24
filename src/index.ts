import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { generateResponse } from './ai_calls';
import cors from 'cors';
import { getChats, getChatMessages, createNewChat } from './chats';
import { bookAppointment, EVENT_TYPE, USER_EMAIL } from './calendar';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true // Required for cookies, authorization headers with HTTPS
}));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the API!' });
});

app.get('/api/chats', (req: Request, res: Response) => {
    const chatList = getChats();
  res.json(chatList);
});

app.get('/api/chats/:id', (req: Request, res: Response) => {
  const chatId = parseInt(req.params.id);
  const messages = getChatMessages(chatId);
  res.json(messages);
});

app.post('/api/chats', (req: Request, res: Response) => {
  const newChatObject = req.body;
  createNewChat(newChatObject);
  res.json({ message: 'Chat created', newChatObject });
});

// Message endpoint
app.post('/api/messages/:id', (req: Request, res: Response) => {
    const chatId = parseInt(req.params.id);
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  generateResponse(chatId,message, res);
});
    
app.post('/api/book-appointment', (req: Request, res: Response) => {
 
  bookAppointment(EVENT_TYPE, USER_EMAIL)
    .then(result => res.json({ message: result }))
    .catch(error => res.status(500).json({ error: error.message }));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 