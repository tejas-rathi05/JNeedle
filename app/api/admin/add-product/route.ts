import service from "@/appwrite/config";
import { useUploadFile } from "@/hooks/useUploadFile";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { uploadFiles, progresses, uploadedFiles, isUploading } =
    useUploadFile();

  const data = await req.json();
  console.log("API DATA: ", data);

  const uploadedImages = await uploadFiles(data.images);
  const categoryId = await service.getProductCategoryId(data.product_category);

  if (uploadedImages) {
    const newProductData: NewProductProps = {
      width: Number(data.product_breadth),
      category: categoryId,
      color: data.product_color,
      name: data.product_name,
      desc: data.product_desc,
      height: Number(data.product_height),
      length: Number(data.product_length),
      price: Number(data.product_price),
      quantity: Number(data.product_quantity),
      inventory_sku: data.product_inventory_sku,
      images: JSON.stringify(uploadedImages),
    };
    const addNewProduct = await service.addNewProduct(newProductData);
  }
}
