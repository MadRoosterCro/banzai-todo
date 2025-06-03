## Getting Started

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd banzai-todo
```

### 2. Set Node.js version (for local development)

If you use `nvm`, run:

```sh
nvm install 20.9.0
nvm use
```

### 3. Start the app and MongoDB with Docker Compose

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
- Component tests (using React Testing Library)

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
