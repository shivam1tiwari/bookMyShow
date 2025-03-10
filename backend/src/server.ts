import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { typeDefs } from './schemas/index';
import { resolvers } from './graphql/resolvers/index';
import { authMiddleware } from './middleware/auth';
import { connectDB } from './config/db';
import { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//context interface for Apollo Server
interface MyContext {
  user?: JwtPayload | string; // JWT middleware output
}

const app = express();

app.use(cors());

// app.use(authMiddleware);



async function startServer() {
  // Initialize Apollo Server with typed context
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});
  await server.start();
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
    // Pass req.user to resolvers
    })
  );

  // Connect to the database 
  await connectDB();

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => console.error('Server startup failed:', err));