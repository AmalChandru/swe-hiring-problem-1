import fs from 'fs';
import os from 'os';
import logger from '../../utils/logger';
import axios from 'axios';
import { getTokenAndEmail } from '../../utils/tokenStorage';
import { saveHistoryToDb, fetchHistoryFromDb } from '../../utils/sqlite';
import { API_URL } from '../../utils/config';

/**
 * Pushes shell history to the server.
 */
export const pushCommand = async () => {
  try {
    const homeDir = os.homedir();
    const historyFilePath = `${homeDir}/.bash_history`; // TODO: Support multiple shells

    const data = await fs.promises.readFile(historyFilePath, 'utf8');
    const historyLines = data.split('\n').filter((line) => line.trim() !== '');
    const parsedHistory = historyLines.map((line) => line.trim());

    await saveHistoryToDb(parsedHistory);

    const savedHistory = await fetchHistoryFromDb();
    logger.info(`History saved to SQLite: ${savedHistory.length} commands.`);

    const { token, email } = getTokenAndEmail();
    if (!token || !email) {
      logger.error('You must be logged in to push history.');
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/push`,
        { history: savedHistory, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        logger.success('Shell history pushed successfully!');
      } else {
        logger.error('Failed to push shell history.');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || (error instanceof Error ? error.message : 'Unknown error');
      logger.error(`An error occurred during push: ${errorMessage}`);
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || (error instanceof Error ? error.message : 'Unknown error');
    logger.error(`An error occurred: ${errorMessage}`);
  }
};
