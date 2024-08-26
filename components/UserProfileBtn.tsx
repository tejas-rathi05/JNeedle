import { LogOut, PanelsTopLeft, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import authService from "@/appwrite/auth";
import { logout } from "@/lib/features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/store";
import Link from "next/link";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";

export default function UserProfileBtn() {
  const router = useRouter()
  const currentUser = useAppSelector((state) => state.auth.userData);
  const dispatch = useDispatch<AppDispatch>();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      router.push("/login")
    });
  };
  const labels = currentUser?.labels || currentUser?.userData?.labels || [];
  const role = labels[0];
  const isAdmin = role === "admin";

  console.log("isAdmin: ", isAdmin);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer p-1">
          <AvatarImage src="/images/avatar/demo_avatar.jpg" alt="avatar" />
          <AvatarFallback>JN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="ml-2 font-bold">
          {isAdmin ? "Admin" : "My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isAdmin && (
            <DropdownMenuItem className="">
              <a href="/admin/dashboard" className="flex w-full h-full">
                <PanelsTopLeft className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </a>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <a href="/my-account" className="flex w-full h-full">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button onClick={logoutHandler} className="flex w-full h-full">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
