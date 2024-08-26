import conf from "@/conf/conf";


export async function fetchAllProducts(): Promise<void> {
  try {
    const res = await fetch(`${conf.baseURL}/api/fetch-all-products`);
    const data = await res.json();

    return data;

  } catch (error) {
    // Handle the error
    console.error("Error deleting file:", error);
  }
}

