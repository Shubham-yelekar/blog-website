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
        return this.login({
          email,
          password,
        });
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
      return await this.account.createEmailPasswordSession(email, password);
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
}

// Create an instance of AuthService
const authService = new AuthService();

// Export the instance for use in other files
export default authService;
