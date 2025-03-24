# Medical Bot Backend

A Node.js backend application built with TypeScript and Express that provides a medical consultation chatbot with appointment booking capabilities.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API key
- Cal.com API key

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd medical-bot-backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   You can either:

   a. Create a `.env` file in the root directory:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   CAL_API_KEY=your_cal_api_key_here
   PORT=3000
   ```

   OR

   b. Pass environment variables directly when running the server:

   ```bash
   OPENAI_API_KEY=your_openai_api_key_here CAL_API_KEY=your_cal_api_key_here npm run dev
   ```

4. Start the development server:

```bash
npm run dev
```

The server will start on port 3000 (or the port specified in your environment variables).

## Available Scripts

- `npm run dev`: Start the development server with hot-reload
- `npm run build`: Build the TypeScript code
- `npm start`: Start the production server
- `npm test`: Run tests

## API Endpoints

- `GET /api/chats`: Get all chat sessions
- `GET /api/chats/:id`: Get messages for a specific chat
- `POST /api/chats`: Create a new chat session
- `POST /api/messages/:id`: Send a message to a chat
- `POST /api/book-appointment`: Book a medical appointment

## Project Structure

```
├── src/                # Source files
│   ├── index.ts       # Main application entry point
│   ├── ai_calls.ts    # OpenAI API integration
│   ├── calendar.ts    # Cal.com appointment booking
│   ├── chats.ts       # Chat management
│   └── utilities.ts   # Utility functions
├── dist/              # Compiled JavaScript files
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── README.md          # Project documentation
```

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key
- `CAL_API_KEY`: Your Cal.com API key
- `PORT`: Server port (default: 3000)

## Development

The project uses:

- TypeScript for type safety
- Express.js for the web server
- OpenAI API for chat completions
- Cal.com API for appointment booking
- CORS enabled for frontend integration
