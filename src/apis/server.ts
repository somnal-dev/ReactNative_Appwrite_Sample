import { APPWRITE_PROJECT_ID, APPWRITE_SERVER_URL } from '@env';
import { Client, Storage, TablesDB } from 'appwrite';

export const client = new Client()
  .setEndpoint(APPWRITE_SERVER_URL)
  .setProject(APPWRITE_PROJECT_ID);

export const database = new TablesDB(client);

export const storage = new Storage(client);
