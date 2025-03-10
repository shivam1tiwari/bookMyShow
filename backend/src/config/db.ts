import AppDataSource from '../typeormconfig'
/**
 * Connects to the PostgreSQL database using TypeORM.
 * 
 * This function initializes the connection to the database and logs a success message
 * if the connection is established successfully. In case of an error, it logs the error
 * and terminates the process with a non-zero status code.
 * 
 * @async
 * @function
 * @throws {Error} Throws an error if the database connection fails.
 */
export async function connectDB() {
  try {
    await AppDataSource.initialize();
    console.log('Connected to PostgreSQL with TypeORM');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

export default AppDataSource;