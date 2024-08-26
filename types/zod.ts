import { z } from "zod";

export const productSchema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  product_desc: z.string().min(1, "Product description is required"),
  product_category: z.string().min(1, "Product category is required"),
  product_color: z.string().min(1, "Product color is required"),
  product_length: z.preprocess(
    (val) => Number(val),
    z.number().positive("Product length must be positive")
  ),
  product_breadth: z.preprocess(
    (val) => Number(val),
    z.number().positive("Product breadth must be positive")
  ),
  product_height: z.preprocess(
    (val) => Number(val),
    z.number().positive("Product height must be positive")
  ),
  product_quantity: z.preprocess(
    (val) => Number(val),
    z.number().int().positive("Product quantity must be positive")
  ),
  product_inventory_sku: z.string().min(1, "Product SKU is required"),
  product_price: z.preprocess(
    (val) => Number(val),
    z.number().positive("Product price must be positive")
  ),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;

export const updateProductSchema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  product_desc: z.string().min(1, "Product description is required"),
  product_color: z.string().min(1, "Product color is required"),
  product_length: z.preprocess(
    (val) => Number(val),
    z.number().positive("Product length must be positive")
  ),
  product_breadth: z.preprocess(
    (val) => Number(val),
    z.number().positive("Product breadth must be positive")
  ),
  product_height: z.preprocess(
    (val) => Number(val),
    z.number().positive("Product height must be positive")
  ),
  product_quantity: z.preprocess(
    (val) => Number(val),
    z.number().int().positive("Product quantity must be positive")
  ),
  product_inventory_sku: z.string().min(1, "Product SKU is required"),
  product_price: z.preprocess(
    (val) => Number(val),
    z.number().positive("Product price must be positive")
  ),
});

export type UpdateProductFormData = z.infer<typeof updateProductSchema>;

export const newAddressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Phone number must be exactly 10 digits",
  }),
  address1: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pincode: z
    .string()
    .regex(
      /^[1-9][0-9]{5}$/,
      "Invalid PIN code. Please enter a valid 6-digit Indian PIN code."
    ),
  isDefault: z.boolean().default(false).optional(),
});
