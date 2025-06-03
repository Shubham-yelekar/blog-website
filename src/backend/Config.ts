import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

interface serviceInt {
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  status: string;
  userId: string;
}

interface UpdatePostParams {
  title?: string;
  content?: string;
  featuredImage?: string;
  status?: string;
}

export class Service {
  client: Client;
  databases: Databases;
  storage: Storage;
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }: serviceInt) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      throw new Error(`Error in creating post: ${error}`);
    }
  }

  async updatePost(
    slug: string,
    { title, content, featuredImage, status }: UpdatePostParams
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      throw new Error(`Error in Update post: ${error}`);
    }
  }

  async deletePost(slug: string) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(`Error in Delete post: ${error}`);
      return false;
    }
  }

  async getPost(slug: string) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(`Error in get post: ${error}`);
    }
  }

  async getPosts(queries: string[] = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return { documents: [] };
    }
  }

  async uploadfile(file: File) {
    try {
      const response = await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      return response;
    } catch (error) {
      console.log(`Error in file Upload : ${error}`);
      return false;
    }
  }

  async deleteFile(fileId: string) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log(`Error in deleting file : ${error}`);
      return false;
    }
  }

  getFilePreview(fileId: string) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
