# Clarion Backend

A Node.js backend application built with TypeScript and Express.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory and add your environment variables:

```env
PORT=3000
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Start the production server:

```bash
npm start
```

## Available Scripts

- `npm run dev`: Start the development server with hot-reload
- `npm run build`: Build the TypeScript code
- `npm start`: Start the production server
- `npm test`: Run tests

## Project Structure

```
├── src/                # Source files
│   └── index.ts       # Main application entry point
├── dist/              # Compiled JavaScript files
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── README.md          # Project documentation
```
