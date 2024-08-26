import service from "@/appwrite/config";

export async function addNewProduct({
  width,
  category,
  color,
  desc,
  height,
  length,
  name,
  price,
  quantity,
  inventory_sku,
  images,
}: NewProductProps): Promise<void> {
  try {
    await service.addNewProduct({
      width,
      category,
      color,
      desc,
      height,
      length,
      name,
      price,
      quantity,
      inventory_sku,
      images,
    });
    return Promise.resolve();
  } catch (error) {
    // Handle the error
    console.error("Error deleting file:", error);
  }
}
