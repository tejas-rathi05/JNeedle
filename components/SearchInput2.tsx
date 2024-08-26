import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight, Menu, Search, X } from "lucide-react";
import FacebookIcon from "./icons/FacebookIcon";
import InstagramIcon from "./icons/InstagramIcon";
import { SearchInputText } from "./ui/search-input-text";

export function SearchInput2() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Search className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"top"}>
      <div className="w-full flex justify-between items-center max-w-screen-2xl px-5 py-3 md:px-10 lg:px-20 lg:py-5">
          <Search size={25} className="text-gray-400 ml-1 lg:ml-2" />

          <SearchInputText
            type="text"
            className="mx-5"
            placeholder="SEARCH..."
            autoFocus
          />

        </div>

        {/* <SheetFooter>
          <div className="absolute bottom-0 left-0 w-full border-t-[2px] p-2 flex gap-2">
            <FacebookIcon />
            <InstagramIcon />
          </div>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
