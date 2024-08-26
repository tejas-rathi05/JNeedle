import { Product } from "@/app/admin/products/columns";
import conf from "@/conf/conf";
import {
  Client,
  ID,
  Databases,
  Storage,
  Query,
  Permission,
  Role,
} from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createUser({ email, password }: { email: string; password: string }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUserCollectionId,
        ID.unique(),
        {
          email,
          password,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createUser :: error: ", error);
    }
  }

  async updateUser(
    id: string,
    { name, password, mobile_number }: UpdateUserParams
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUserCollectionId,
        id,
        {
          name,
          password,
          mobile_number,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateUser :: error: ", error);
    }
  }

  async uploadFile(file: File): Promise<{ id: string; name: string }> {
    try {
      const response = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );

      return {
        id: response.$id,
        name: file.name,
      };
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error: ", error);
      throw error;
    }
  }

  async getFilePreview(fileId: string) {
    try {
      const resultURL = await this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
      );
      return resultURL.href;
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error: ", error);
      throw error;
    }
  }

  async getPreviewUrlFromProductId(productId: string) {
    try {
      const productDetails = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteProductCollectionId,
        [Query.equal("$id", productId)]
      );
      const response = productDetails.documents;
      if (response) {
        const products = response.map((product) => ({
          ...product,
          imgurl:
            typeof product.imgurl === "string"
              ? JSON.parse(product.imgurl)
              : [],
        }));
        console.log(products);
        return products[0].imgurl[0].previewUrl;
      }
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error: ", error);
      throw error;
    }
  }

  async deleteFile(fileId: string) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error: ", error);
      throw error;
    }
  }

  async getAllProductCategories() {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteProductCategoryCollectionId,
        []
      );

      return response.documents;
    } catch (error) {
      console.log("Appwrite service :: getProductCategories :: error: ", error);
      throw error;
    }
  }

  async getProductCategoryId(category_name: string) {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteProductCategoryCollectionId,
        [Query.equal("name", [category_name])]
      );

      if (response.documents.length > 0) {
        return response.documents[0]["$id"];
      } else {
        throw new Error(`Category '${category_name}' not found`);
      }
    } catch (error) {
      console.log("Appwrite service :: getProductCategories :: error: ", error);
      throw error;
    }
  }

  async uploadProductInventory({
    quantity,
    inventory_sku,
  }: {
    quantity: number;
    inventory_sku: string;
  }) {
    try {
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteProductInventoryCollectionId,
        ID.unique(),
        {
          quantity,
          sku: inventory_sku,
        }
      );

      return response.$id;
    } catch (error) {
      console.log(
        "Appwrite service :: uploadProductInventory :: error: ",
        error
      );
      throw error;
    }
  }

  async addNewProduct({
    name,
    desc,
    category,
    price,
    quantity,
    width,
    height,
    length,
    color,
    inventory_sku,
    images,
  }: NewProductProps) {
    try {
      // const categoryId = await this.getProductCategoryId(category);
      const inventoryId = await this.uploadProductInventory({
        quantity,
        inventory_sku,
      });
      await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteProductCollectionId,
        ID.unique(),
        {
          name,
          desc,
          price,
          width,
          height,
          length,
          color,
          imgurl: images,
          productCategory: category,
          productInventory: inventoryId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: addNewProduct :: error: ", error);
    }
  }

  async getAllProducts() {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteProductCollectionId,
        [Query.limit(200)]
      );

      // console.log(response.documents);

      return response.documents;
    } catch (error) {
      console.log("Appwrite service :: getAllProducts :: error: ", error);
    }
  }

  async getProduct(productId: string) {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteProductCollectionId,
        [Query.equal("$id", productId)]
      );

      return response.documents;
    } catch (error) {
      console.log("Appwrite service :: getProduct :: error: ", error);
    }
  }

  async updateProduct({
    productId,
    productInventoryId,
    updatedData,
  }: {
    productId: string;
    productInventoryId: string;
    updatedData: UpdateProductProps;
  }) {
    try {
      const response = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteProductCollectionId,
        productId,
        {
          name: updatedData.product_name,
          desc: updatedData.product_desc,
          price: updatedData.product_price,
          width: updatedData.product_breadth,
          height: updatedData.product_height,
          length: updatedData.product_length,
          color: updatedData.product_color,
          productInventory: {
            $id: productInventoryId,
            quantity: updatedData.product_quantity,
            sku: updatedData.product_inventory_sku,
          },
        }
      );

      return response.documents;
    } catch (error) {
      console.log("Appwrite service :: updateProduct :: error: ", error);
    }
  }

  async deleteProduct(productArr: Product[]) {
    try {
      for (const product of productArr) {
        await this.databases.deleteDocument(
          conf.appwriteDatabaseId,
          conf.appwriteProductCollectionId,
          product.$id // Accessing $id property directly
        );
      }
      return "Product(s) deleted successfully!";
    } catch (error) {
      console.error("Appwrite service :: deleteProduct :: error: ", error);
      return "Error deleting products";
    }
  }

  async addCartItem({
    userId,
    productId,
    product,
    quantity,
  }: UserCartHandlerProps) {
    try {
      // Fetch existing cart items for the user
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteUserCartCollectionId,
        [Query.equal("userId", userId), Query.equal("productId", productId)]
      );

      if (response.total > 0) {
        // If item exists, update the quantity
        const existingCartItem = response.documents[0];
        const updatedQuantity = existingCartItem.quantity + quantity;

        const updatedDocument = await this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteUserCartCollectionId,
          existingCartItem.$id,
          {
            quantity: updatedQuantity,
          }
        );

        console.log("Document updated:", updatedDocument);
        return updatedDocument;
      } else {
        // If item does not exist, create a new document with permissions
        const newDocument = await this.databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteUserCartCollectionId,
          ID.unique(),
          {
            userId,
            productId,
            quantity,
            product,
          }
        );

        console.log("Document created:", newDocument);
        return newDocument;
      }
    } catch (error) {
      console.error("Failed to create or update document:", error);
      throw error;
    }
  }

  async getCartItems(userId: string) {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteUserCartCollectionId,
        [Query.equal("userId", userId)]
      );
      console.log("CartItems:", response);
      return response.documents;
    } catch (error) {
      console.error("Appwrite service :: getCartItems :: error: ", error);
    }
  }

  async updateCartItem(itemId: string, quantity: number) {
    try {
      const res = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUserCartCollectionId,
        itemId,
        {
          quantity,
        }
      );
      return res;
    } catch (error) {
      console.error("Appwrite service :: UpdateCartItem :: error: ", error);
    }
  }

  async deleteCartItem(itemId: string) {
    try {
      const res = await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUserCartCollectionId,
        itemId
      );
      return res;
    } catch (error) {
      console.error("Appwrite service :: deleteCartItem :: error: ", error);
    }
  }

  async addNewAddress(payload: any) {
    try {
      // Check if the new address is set as default
      if (payload.isDefault) {
        // Fetch all addresses for the user
        const userAddresses = await this.getUserAddress(payload.userId);

        // Update all addresses to set isDefault to false
        if (userAddresses) {
          const updatePromises = userAddresses.map((address: any) => {
            if (address.$id !== payload.$id) {
              // Avoid updating the current new address
              return this.updateUserAddress(address.$id, { isDefault: false });
            }
          });
          await Promise.all(updatePromises);
        }
      }

      // Add the new address
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUserAddressCollectionId,
        ID.unique(),
        payload
      );
      return response;
    } catch (error) {
      console.error("Appwrite service :: addNewAddress :: error: ", error);
    }
  }

  async getUserAddress(userId: string) {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteUserAddressCollectionId,
        [Query.equal("userId", userId)]
      );
      return response.documents;
    } catch (error) {
      console.error("Appwrite service :: addNewAddress :: error: ", error);
    }
  }

  async updateUserAddress(addressId: string, payload: any) {
    try {
      // Check if the address is set as default
      if (payload.isDefault) {
        // Fetch all addresses for the user
        const userAddresses = await this.getUserAddress(payload.userId);

        // Update all addresses to set isDefault to false
        if (userAddresses) {
          const updatePromises = userAddresses.map((address: any) => {
            if (address.$id !== addressId) {
              // Avoid updating the address being updated
              return this.updateUserAddress(address.$id, { isDefault: false });
            }
          });
          await Promise.all(updatePromises);
        }
      }

      // Update the address
      const response = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUserAddressCollectionId,
        addressId,
        payload
      );
      return response;
    } catch (error) {
      console.error("Appwrite service :: updateUserAddress :: error: ", error);
    }
  }

  async setPrimaryAddress(userId: string, addressId: string) {
    try {
      // Fetch all addresses for the user
      const userAddresses = await this.getUserAddress(userId);

      // Update all addresses to set isDefault to false except the one being set as default
      if (userAddresses) {
        const updatePromises = userAddresses.map((address: any) => {
          if (address.$id !== addressId) {
            return this.updateUserAddress(address.$id, { isDefault: false });
          }
        });
        await Promise.all(updatePromises);
      }


      // Set the specified address as default
      const response = await this.updateUserAddress(addressId, {
        isDefault: true,
      });

      return response;
    } catch (error) {
      console.error("Appwrite service :: setDefaultAddress :: error: ", error);
    }
  }
}

const service = new Service();
export default service;
