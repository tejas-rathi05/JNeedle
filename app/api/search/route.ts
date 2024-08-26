import { NextRequest, NextResponse } from "next/server";
import { Client, Databases, Query } from "appwrite";
import conf from "@/conf/conf";

const client = new Client()
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId);

const databases = new Databases(client);

export async function POST(req: NextRequest) {
  const {query} = await req.json();

  if (!query) {
    return NextResponse.json(
      { error: "No search query provided" },
      { status: 400 }
    );
  }

  try {
    const response = await databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteProductCollectionId,
      [
        Query.or([
          Query.contains("name", query),
          Query.contains("desc", query),
        ]),
      ]
    );
    const data = response.documents as unknown as ProductDetails[];

    if (data) {
      const products = data.map((product) => ({
        ...product,
        imgurl:
          typeof product.imgurl === "string" ? JSON.parse(product.imgurl) : [],
      }));
      return NextResponse.json(products);
    }
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "An error occurred while searching" },
      { status: 500 }
    );
  }
}
