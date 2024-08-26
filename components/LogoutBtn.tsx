import authService from "@/appwrite/auth";
import { Button } from "./ui/button";
import { logout } from "@/lib/features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import conf from "@/conf/conf";
import { useRouter } from "next/navigation";

const LogoutBtn = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      router.push("/login")
    });
  };
  return (
    <div className="flex justify-center items-center w-full">
      <button
        className="hover:before:bg-white relative h-[50px] w-full overflow-hidden border border-stone-800 bg-stone-800 px-8 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-stone-800 hover:before:left-0 hover:before:w-full"
        onClick={logoutHandler}
      >
        <span className="relative z-10 w-full text-sm tracking-widest flex items-center justify-center">
          Logout
        </span>
      </button>
    </div>
  );
};

export default LogoutBtn;
