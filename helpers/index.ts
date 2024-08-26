import { Product } from "@/app/admin/products/columns";

export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export const getRandomProducts = (products: Product[], count: number): Product[] => {
  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
