import { APPWRITE_PROJECT_ID, APPWRITE_SERVER_URL } from '@env';
import { Client } from 'appwrite';

const client = new Client()
  .setEndpoint(APPWRITE_SERVER_URL)
  .setProject(APPWRITE_PROJECT_ID);

export default client;
