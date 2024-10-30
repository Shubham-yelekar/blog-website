import conf from "../conf/conf"  // 1 import config

import { Client, Account } from "appwrite"; // 2 import config

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(conf.appwriteProjectId); // Your project ID

const account = new Account(client);

const result = await account.get();

console.log(result);