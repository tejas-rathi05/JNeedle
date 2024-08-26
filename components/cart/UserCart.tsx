"use client";

import service from "@/appwrite/config";
import { useAppSelector } from "@/lib/store";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/helpers";
import { FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

const UserCart = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [cartItems, setCartItems] = useState<UserCartItem[] | []>([]);
  const userData = useAppSelector((state) => state.auth.userData);
  const authStatus = useAppSelector((state) => state.auth.status); // Assuming you have this in your state

  const cartQuery = useQuery({
    queryKey: ["cart", userData.$id],
    queryFn: async () => {
      const userId = userData?.userData?.$id ?? userData?.$id;
      console.log("userId: ", userId);
      const cartData = await service.getCartItems(userId);
      console.log("cartData: ", cartData);
      if (cartData) {
        const transformedCartData = transformCartData(cartData);
        setCartItems(transformedCartData);
        return transformedCartData;
      } else {
        setCartItems([]);
        return null;
      }
    },
  });

  console.log(cartItems);

  // useEffect(() => {
  //   const fetchCartItems = async () => {
  //     const userId = userData?.userData?.$id ?? userData?.$id;
  //     const cartData = await service.getCartItems(userId);
  //     if (cartData) {
  //       const transformedCartData = transformCartData(cartData);
  //       console.log("transformed: ", transformedCartData);
  //       setCartItems(transformedCartData);
  //     } else {
  //       setCartItems([]);
  //     }
  //   };

  //   fetchCartItems();
  // }, [userData.$id]);

  const transformCartData = (cartData: any[]): UserCartItem[] => {
    return cartData.map((item) => {
      // Assuming your Document structure matches UserCartItem
      return {
        userId: item.userId,
        $id: item.$id,
        product: item.product,
        productId: item.productId,
        quantity: item.quantity,
      };
    });
  };

  const handleDecreaseQuantity = async (
    itemId: string,
    currentQuantity: number
  ) => {
    if (currentQuantity > 1) {
      await service.updateCartItem(itemId, currentQuantity - 1);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.$id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      handleRemoveFromCart(itemId);
    }
  };

  const handleIncreaseQuantity = async (
    itemId: string,
    currentQuantity: number
  ) => {
    await service.updateCartItem(itemId, currentQuantity + 1);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.$id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleRemoveFromCart = async (itemId: string) => {
    await service.deleteCartItem(itemId);
    await queryClient.invalidateQueries({
      queryKey: ["cartItems", userData?.userData?.$id ?? userData?.$id],
      refetchType: "all",
    });
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.$id !== itemId)
    );
  };

  const handleCheckout = () => {
    if (!authStatus) {
      router.push("/login");
    } else {
      router.push("/checkout");
    }
  };

  const calculateTotal = () => {
    if (cartQuery.data) {
      return cartQuery.data.reduce((total, item) => {
        if (item.product && item.product.price != null) {
          return total + item.product.price * item.quantity;
        } else {
          return total;
        }
      }, 0);
    } else {
      return 0;
    }
  };

  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full max-w-4xl">
        {cartQuery.isLoading && (
          <div className="flex flex-col gap-5 mt-32">
            <Skeleton className="lg:w-80 h-10" />
            <Skeleton className="lg:w-80 h-10" />
            <Skeleton className="lg:w-80 h-10" />
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="w-full h-full">
            <h1 className="py-10 text-3xl text-gray-600">YOUR SHOPPING BAG</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="w-10"> </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border-b">
                {cartItems.map((item) => {
                  const imgUrl = item.product
                    ? JSON.parse(item.product.imgurl)
                    : [];
                  console.log("imgUrl: ", imgUrl);

                  return (
                    <TableRow key={item.$id} className="border-none">
                      <TableCell className="font-medium">
                        <div>
                          {item.product ? (
                            <a href={`/products/${item.product.$id}`}>
                              <img
                                src={imgUrl[0]["previewUrl"]}
                                alt={item.product.name}
                                className="w-[100px] h-[100px] object-contain"
                              />
                            </a>
                          ) : (
                            <p>No image available</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center items-center w-32 border">
                          <Button
                            variant={"ghost"}
                            className="w-fit h-12"
                            onClick={() =>
                              item.$id &&
                              item.quantity != null &&
                              handleDecreaseQuantity(item.$id, item.quantity)
                            }
                          >
                            <Minus size={10} />
                          </Button>
                          <div className="w-full h-12 flex justify-center items-center text-right">
                            <input
                              type="number"
                              value={item.quantity}
                              readOnly
                              className="w-full h-full bg-transparent text-center text-sm border-none"
                            />
                          </div>
                          <Button
                            variant={"ghost"}
                            className="w-fit h-12"
                            onClick={() =>
                              item.$id &&
                              item.quantity != null &&
                              handleIncreaseQuantity(item.$id, item.quantity)
                            }
                          >
                            <Plus size={10} />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.product
                          ? formatPrice(item.product.price * item.quantity)
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            item.$id &&
                            item.quantity != null &&
                            handleRemoveFromCart(item.$id)
                          }
                        >
                          <FaTrashAlt className="text-red-800" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="w-full max-w-4xl mt-10 text-right flex flex-col items-end justify-center">
              <p className="text-sm font-light">TOTAL :</p>
              <p className="text-xl tracking-widest">
                {formatPrice(calculateTotal())}
              </p>
              <p className="my-5 text-gray-600">
                Shipping & taxes calculated at checkout
              </p>
              <div className="w-fit">
                <button
                  className="hover:before:bg-white relative h-[50px] w-full overflow-hidden border border-stone-800 bg-stone-800 px-8 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-stone-800 hover:before:left-0 hover:before:w-full"
                  onClick={handleCheckout}
                >
                  <span className="relative z-10 w-full text-sm tracking-widest flex items-center justify-center">
                    CHECKOUT
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}{" "}
        {cartQuery.data && cartQuery.data.length <= 0 && (
          <div className="py-20">
            <div className="flex flex-col items-center justify-center">
              <ShoppingBag size={40} className="text-muted-foreground" />
              <p className="text-muted-foreground mt-3">YOUR CART IS EMPTY!</p>
            </div>
            <a href="/products">
              <div className="w-fit py-10">
                <button className="hover:before:bg-white relative h-[50px] w-full overflow-hidden border border-stone-800 bg-stone-800 px-8 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-stone-800 hover:before:left-0 hover:before:w-full">
                  <span className="relative z-10 w-full text-sm tracking-widest flex items-center justify-center">
                    SHOP OUR PRODUCTS
                  </span>
                </button>
              </div>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserCart;
