import service from "@/appwrite/config";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

// pages/api/products.js
export  async function GET(req:NextRequest, res: NextResponse) {
  // const { category, color, sort } = req.query;
  const category = req.nextUrl.searchParams.get("category");
  const sort = req.nextUrl.searchParams.get("sort");
  // Fetch data from your database or another API
  let products = await service.getAllProducts();

  // Apply category filter
  if (category && category !== "all") {
    products = products?.filter(product => product.productCategory.name === category);
  }

  // // Apply color filter
  // if (color) {
  //   products = products.filter(product => product.color === color);
  // }

  // Apply sorting
  if (sort && sort !== "featured") {
    if (sort === 'price-asc') {
      products = products?.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      products = products?.sort((a, b) => b.price - a.price);
    } else if (sort === 'popularity') {
      products = products?.sort((a, b) => b.popularity - a.popularity);
    }
  }

  if (products) {
    const response = products.map((product) => ({
      ...product,
      imgurl:
        typeof product.imgurl === "string" ? JSON.parse(product.imgurl) : [],
    }));
    return NextResponse.json(response);
  }
}
