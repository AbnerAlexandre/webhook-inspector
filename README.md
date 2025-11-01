# Webhook Inspector

A tool for inspecting and managing webhooks with a modern web interface.

## Technologies

### Backend (API)
- Node.js with TypeScript
- Fastify framework
- PostgreSQL database
- Drizzle ORM
- Zod for validation
- Swagger/OpenAPI documentation
- Biome for code formatting

### Frontend (Web)
- React 19
- TypeScript
- Vite
- Modern ESLint configuration

## Prerequisites

- Node.js (Latest LTS version recommended)
- PNPM package manager
- PostgreSQL database

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AbnerAlexandre/webhook-inspector.git
cd webhook-inspector
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure the environment:
   - Copy the `.env.example` file in the api directory to `.env`
   - Update the environment variables as needed

4. Set up the database:
```bash
cd api
pnpm db:generate
pnpm db:migrate
```

## Running the Application

### Development Mode

1. Start the API server:
```bash
cd api
pnpm dev
```

2. Start the web application (in a new terminal):
```bash
cd web
pnpm dev
```

### Production Mode

1. Build and start the API:
```bash
cd api
pnpm build
pnpm start
```

2. Build and serve the web application:
```bash
cd web
pnpm build
pnpm preview
```

## Features

- Webhook inspection and management
- Real-time webhook monitoring
- PostgreSQL database for webhook storage
- Modern React-based user interface
- API documentation with Swagger/OpenAPI

## Development Tools

- Database management: `pnpm db:studio` (in api directory)
- Code formatting: `pnpm format` (in api directory)
- TypeScript compilation checking: Available in both api and web directories

## License

ISC