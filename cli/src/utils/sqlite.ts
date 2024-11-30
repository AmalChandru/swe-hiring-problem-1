import sqlite3 from 'sqlite3';
import path from 'path';
import logger from './logger';

const DB_PATH = path.join(process.env.HOME || '~', '.shell-sync', 'history.db');

/**
 * Opens a connection to the SQLite database.
 * @returns A new SQLite database instance.
 */
const openDb = (): sqlite3.Database => {
  return new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      logger.error(`Failed to open database: ${err.message}`);
    } else {
      logger.debug('Database connection opened successfully.');
    }
  });
};

/**
 * Initializes the history table if it doesn't exist.
 */
export const initDb = (): void => {
  const db = openDb();
  db.run(`
    CREATE TABLE IF NOT EXISTS shell_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      command TEXT NOT NULL,
      timestamp INTEGER NOT NULL
    );
  `, (err) => {
    if (err) {
      logger.error(`Failed to initialize database: ${err.message}`);
    } else {
      logger.debug('Database initialized successfully.');
    }
    db.close();
  });
};

/**
 * Saves shell history into the SQLite database.
 * @param history - An array of shell commands to save.
 */
export const saveHistoryToDb = (history: string[]): void => {
  const db = openDb();
  const timestamp = Date.now();

  db.serialize(() => {
    const stmt = db.prepare('INSERT INTO shell_history (command, timestamp) VALUES (?, ?)');
    history.forEach((command) => {
      stmt.run(command, timestamp, (err: any) => {
        if (err) {
          logger.error(`Failed to save command: ${err.message}`);
        }
      });
    });
    stmt.finalize();
  });

  db.close((err) => {
    if (err) {
      logger.error(`Failed to close database: ${err.message}`);
    } else {
      logger.debug('Database connection closed after saving history.');
    }
  });
};

/**
 * Fetches all shell history from the SQLite database.
 * @returns A promise that resolves to an array of shell commands.
 */
export const fetchHistoryFromDb = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const db = openDb();
    db.all('SELECT command FROM shell_history', (err, rows: { command: string }[]) => {
      db.close((closeErr) => {
        if (closeErr) {
          logger.error(`Failed to close database: ${closeErr.message}`);
        } else {
          logger.debug('Database connection closed after fetching history.');
        }
      });

      if (err) {
        logger.error(`Failed to fetch history: ${err.message}`);
        reject(err);
      } else {
        resolve(rows.map((row) => row.command));
      }
    });
  });
};
