// SomeOtherComponent.ts

import service from "@/appwrite/config";


export async function deleteUploadedFile(fileId: string): Promise<void> {
  try {
    await service.deleteFile(fileId);
  } catch (error) {
    // Handle the error
    console.error("Error deleting file:", error);
  }
}

