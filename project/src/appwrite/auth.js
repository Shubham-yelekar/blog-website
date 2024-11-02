
import conf from "../conf.js"  // 1. Import the configuration file containing appwriteUrl and projectId

import { Client, Account } from "appwrite"; // 2. Import the necessary classes (Client and Account) from the Appwrite library

// Define the AuthService class to handle authentication-related functionality
export class AuthService {
    client = new Client();  // Initialize a new Client instance
    account;  // Placeholder for the Account instance
    
    constructor(){
        // Set up the Appwrite client with the endpoint and project ID from the config file
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        
        // Initialize the Account instance using the configured client
        this.account = new Account(this.client)
    }

    // Method to create a new account with email, password, and name parameters
    async createAccount ({email, password, name}){
        try{
           // Attempt to create a new user account using a unique ID and provided credentials
           const userAccount =  await this.account.create(ID.unique(), email, password, name)
           
           // If account creation is successful, log the user in and return the session
           if(userAccount){
            return this.logIn({email,password})
           } else {
            return userAccount;  // If creation fails, return the user account response
           }
        }catch(error){
            throw error  // Throw any errors encountered for debugging or handling elsewhere
        }
    }

    // Method to log in a user with their email and password
    async logIn({email, password}) {
        try {
            // Create a new session with the provided credentials and return it
            return await this.account.createEmailPasswordSession(email, password);
        } catch(error){
            throw error  // Throw any errors encountered during login
        }
    }

    // Method to retrieve the current logged-in user's data
    async getCurrentUser(){
        try {
            // Attempt to get the current user's account information
            return await this.account.get(); 
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error", error)  // Log any errors encountered
        }

        return null  // Return null if unable to retrieve user data
    }

    // Method to log the user out by deleting all active sessions
    async logout(){
        try {
            await this.account.deleteSessions('all')  // Delete all sessions to log the user out
        } catch (error) {
            console.log("Logout", error)  // Log any errors encountered during logout
        }
    }
}

// Instantiate the AuthService class and export it for use in other parts of the application
const authService = new AuthService();

export default authService
