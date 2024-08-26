interface NewProductProps{
  width: number,
  category: string,
  color: string,
  desc: string,
  height: number,
  length: number,
  name: string,
  price: number,
  quantity: number,
  inventory_sku: string,
  images: string,
}

interface UpdateProductProps{
  product_length: number,
  product_breadth: number,
  product_height: number,
  product_color: string,
  product_desc: string,
  product_name: string,
  product_price: number,
  product_quantity: number,
  product_inventory_sku: string,
}

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  previewUrl?: string;
}

interface UserCartHandlerProps{
  userId: string,
  productId: string,
  quantity: number,
  product: any
}

interface ProductDetails {
  $id: string;
  length: number;
  width: number;
  height: number;
  desc: string;
  imgurl: [];
  name: string;
  productCategory: {
    name: string;
  };
  price: number;
  productInventory: [];
};

interface ProductDetailsNotParsed {
  $id: string;
  length: number;
  width: number;
  height: number;
  desc: string;
  imgurl: string;
  name: string;
  productCategory: {
    name: string;
  };
  price: number;
  productInventory: [];
};

interface ProductCategory{
  name: string;
  $id: string;
}

interface UserCartItem {
  userId?: string;
  $id?: string | undefined;
  id?: string;
  product?: ProductDetailsNotParsed;
  productId?: string;
  quantity: number;
  name?: string;
  price?: number;
  imgurl?: [];
}

interface UpdateUserParams {
  name?: string;
  password?: string;
  mobile_number?: string;
}

interface UpdateUserResponse {
  $id: string;
  name: string;
  password: string;
  mobile_number: string;
}

interface NewAddressProps{
  firstName: string,
  lastName: string,
  phone: string,
  address1: string,
  address2: string,
  city: string,
  state: string,
  country: string,
  pincode: string,
  isDefault: boolean
}
