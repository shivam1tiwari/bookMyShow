import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();
/**
 * Initializes the connection to the PostgreSQL database using TypeORM.
 * The `AppDataSource` instance is configured to connect to the database specified by the `DATABASE_URL`
 * environment variable. It enables automatic schema synchronization (for development purposes),
 * logging of SQL queries, and specifies the directory for the entity files.
 * 
 * @constant
 * @type {DataSource}
 * // Access the data source
 */
export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true, // Auto-syncs schema
  logging: true,
  entities: ['src/entities/*.ts'],
  // migrations: ['src/migrations/*.ts'],
});

export default AppDataSource;