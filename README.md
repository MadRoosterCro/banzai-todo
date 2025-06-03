## Getting Started

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd banzai-todo
```

### 2. Install dependencies

```sh
npm install
```

### 3. Set Node.js version (for local development)

If you use `nvm`, run:

```sh
nvm install 20.9.0
nvm use
```

### 4. Start the app and MongoDB with Docker Compose

This will build and run both the Next.js app and MongoDB in containers:

```sh
npm run docker:up
```

- The app will be available at [http://localhost:3000](http://localhost:3000)

To stop the containers:

```sh
npm run docker:down
```

### 3. Testing

The app uses Vitest for running unit tests. The test suite includes:

- Schema validation tests
- tRPC router tests with mocked MongoDB

#### Running Tests

To run tests:

```sh
npm test
```

#### Test Structure

Tests are located in the `src` directory alongside the code they test, following the pattern `*.test.ts` or `*.test.tsx`. For example:

- `src/server/routers/todo.test.ts` - Tests for the todo router
- `src/server/schemas.test.ts` - Tests for Zod schemas

## Tech Stack

- Next.js
- TypeScript
- tRPC
- MongoDB
- Docker

### Environment Variables

The app requires the following environment variables:

- `MONGODB_URI`: MongoDB connection string
- `MONGODB_DATABASE`: MongoDB database name

Example `.env` file:

```env
# MongoDB connection string
MONGODB_URI=mongodb://root:example@localhost:27017/

# MongoDB database name
MONGODB_DATABASE=example
```

These are automatically set in the Docker environment. For local development, create a `.env` file with these variables.
