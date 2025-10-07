import { APPWRITE_PROJECT_ID, APPWRITE_SERVER_URL } from '@env';
import { Client, TablesDB } from 'appwrite';

export const client = new Client()
  .setEndpoint(APPWRITE_SERVER_URL)
  .setProject(APPWRITE_PROJECT_ID);

export const database = new TablesDB(client);
