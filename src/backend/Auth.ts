import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

interface AccountInt {
  email: string;
  password: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  // creating a class of Authentication services
  // Initialise appwrite client
  client: Client;
  account: Account;

  constructor() {
    this.client = new Client() // Set endpoint and project ID from config
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    // Initialize the Account service
    this.account = new Account(this.client);
  }

  // Create a new user account and log them in
  async createAccount({ email, password, name }: AccountInt) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // Automatically log in the user after account creation
        const session = await this.login({ email, password });

        return session;
      } else {
        return userAccount;
      }
    } catch (error) {
      throw new Error(`Error in Creating Account : ${error}`);
    }
  }

  // Log in an existing user with email and password
  async login({ email, password }: LoginData) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log("Session created successfully:", session);
      return session;
    } catch (error) {
      throw new Error(`Error in Loging Account : ${error}`);
    }
  }

  // Log out the currently logged-in user
  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      throw new Error(`Error in Logout : ${error}`);
    }
  }
  // Get the currently logged-in user's details
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw new Error(`Error in Current User : ${error}`);
    }
  }

  async checkActiveSessions() {
    try {
      const session = await this.account.getSession("current");

      return session !== null;
    } catch (error) {
      if (
        (error as any).code === 401 ||
        (error as any).type === "general_unauthorized_scope"
      ) {
        return false;
      }
      // If there's an error (e.g., no active session), handle it appropriately
      throw new Error(`Error in Current active Sessions : ${error}`);
    }
  }

  async deleteAllSessions() {
    try {
      // get the list of the setions
      const sessions = await this.account.listSessions();

      if (sessions.sessions.length === 0) {
        return;
      }

      await Promise.all(
        sessions.sessions.map(async (session) => {
          console.log(`Deleting session: ${session.$id}`);
          await this.account.deleteSession(session.$id);
        })
      );
    } catch (error) {
      if (
        (error as any).code === 401 ||
        (error as any).type === "general_unauthorized_scope"
      ) {
        return;
      }
      throw new Error(`Error in Deleting sessions User : ${error}`);
    }
  }
}

// Create an instance of AuthService
const authService = new AuthService();

// Export the instance for use in other files
export default authService;
