import conf from "@/conf/conf";
import { Client, Account, ID, OAuthProvider } from "appwrite";
import service from "./config";
import { cookies } from "next/headers";
import { createAdminClient } from "./adminAuth";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    try {
      console.log(conf.appwriteUrl);
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        await service.createUser({
          email,
          password,
        });
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);

      const user = await this.account.get()
      console.log("SESSION: ", user)

      if(user.labels[0] === "admin"){
        const res = await fetch(`${conf.baseURL}/api/adminLogin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })
      }
      return true
      
    } catch (error) {
      throw error;
    }
  }

  async googleLogin() {
    try {
      const res = this.account.createOAuth2Session(
        "google" as OAuthProvider,
        `${conf.baseURL}/login`,
        `${conf.baseURL}/fail`
      );
      console.log("Google Login: ", res);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error: ", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      const res = await fetch(`${conf.baseURL}/api/adminLogout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log("Logout: ", res);
    } catch (error) {
      console.log("Appwrite service :: logout :: error: ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
