# Techni Worker Backend

Node.js backend for the Techni Worker application.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Validation**: Joi
- **Security**: Helmet, bcryptjs

## Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── models/          # Database schemas
├── routes/          # API routes
├── utils/           # Utility functions
└── index.js         # Entry point
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB (local or cloud)

### Installation

1. Clone the repository
   ```bash
   git clone [your-repo-url]
   cd TECHNI-WORKER_BACKEND
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create environment file
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration values

### Running the Server

#### Development (with hot reload)
```bash
npm run dev
```

#### Production
```bash
npm start
```

## API Endpoints

(Update with your actual endpoints)

## Testing

Run tests with:
```bash
npm test
```

## Linting

Check code style:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

## Contributing

Please follow the code style standards and write tests for new features.

## License

MIT
