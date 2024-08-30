"use client"; // Ensure this is at the top for client-side rendering

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateQuantity, removeFromCart } from "@/lib/features/cartSlice";
import { AppDispatch, useAppSelector } from "@/lib/store";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useDispatch } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { formatPrice } from "@/helpers";
import { useRouter } from "next/navigation"; // Ensure proper use of hooks
import Link from "next/link";
import conf from "@/conf/conf";

// Extracted CartItem Component for better modularity
const CartItem = ({ item, handleDecrease, handleIncrease, handleRemove }) => (
  <TableRow key={item.id} className="border-none">
    <TableCell className="font-medium">
      <Link href={`${conf.baseURL}/products/${item.id}`}>
        {/* Use Link for client-side navigation */}
        <img
          src={item.imgurl[0].previewUrl}
          alt={item.name}
          className="w-[100px] h-[100px] object-contain"
        />
      </Link>
    </TableCell>
    <TableCell>
      <div className="flex justify-center items-center w-32 border">
        <Button
          variant="ghost"
          className="w-fit h-12"
          onClick={() => handleDecrease(item.id, item.quantity)}
        >
          <Minus size={10} />
        </Button>
        <div className="w-full h-12 flex justify-center items-center text-center">
          <input
            type="number"
            value={item.quantity}
            readOnly
            className="w-full h-full bg-transparent text-center text-sm border-none"
          />
        </div>
        <Button
          variant="ghost"
          className="w-fit h-12"
          onClick={() => handleIncrease(item.id, item.quantity)}
        >
          <Plus size={10} />
        </Button>
      </div>
    </TableCell>
    <TableCell>{formatPrice(item.price * item.quantity)}</TableCell>
    <TableCell>
      <Button variant="ghost" onClick={() => handleRemove(item.id)}>
        <FaTrashAlt className="text-red-800" />
      </Button>
    </TableCell>
  </TableRow>
);

// Extracted EmptyCart Component for better modularity
const EmptyCart = () => (
  <div className="py-20">
    <div className="flex flex-col items-center justify-center">
      <ShoppingBag size={40} className="text-muted-foreground" />
      <p className="text-muted-foreground mt-3">YOUR CART IS EMPTY!</p>
    </div>
    <Link href="/products">
      {/* Use Link for client-side navigation */}
      <div className="w-fit py-10">
        <button className="hover:before:bg-white relative h-[50px] w-full overflow-hidden border border-stone-800 bg-stone-800 px-8 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-stone-800 hover:before:left-0 hover:before:w-full">
          <span className="relative z-10 w-full text-sm tracking-widest flex items-center justify-center">
            SHOP OUR PRODUCTS
          </span>
        </button>
      </div>
    </Link>
  </div>
);

const LocalCart = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useAppSelector((state) => state.cart.items);
  const authStatus = useAppSelector((state) => state.auth.status);

  // Combined handleIncreaseQuantity and handleDecreaseQuantity into one function for clarity
  const handleQuantityChange = (itemId, currentQuantity, isIncrease) => {
    const newQuantity = isIncrease ? currentQuantity + 1 : currentQuantity - 1;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(itemId));
    }
  };

  // Simplified handleCheckout logic for better readability
  const handleCheckout = () => {
    const path = authStatus ? "/checkout" : "/login";
    router.push(path);
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="w-full h-full flex items-center justify-center max-w-4xl">
      {cartItems.length > 0 ? (
        <div className="w-full h-full">
          <h1 className="py-10 text-3xl text-gray-600">YOUR SHOPPING BAG</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border-b">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  handleDecrease={(id, qty) =>
                    handleQuantityChange(id, qty, false)
                  } // Updated to use combined function
                  handleIncrease={(id, qty) =>
                    handleQuantityChange(id, qty, true)
                  } // Updated to use combined function
                  handleRemove={(id) => dispatch(removeFromCart(id))}
                />
              ))}
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
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default LocalCart;

