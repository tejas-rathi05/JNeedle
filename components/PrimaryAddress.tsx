import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { CirclePlus } from "lucide-react";
import NewAddressForm from "./NewAddressForm";

const PrimaryAddress = ({
  userAddressData,
  currentUserId,
}: {
  userAddressData: any;
  currentUserId: string;
}) => {
  return (
    <>
      <div className="flex justify-between items-center py-3 border-b ">
        <p className="tracking-wider font-semibold">PRIMARY ADDRESS</p>
        <a href="/my-account/my-address">
          <Button variant={"ghost"} className="text-xs text-muted-foreground">
            Edit
          </Button>
        </a>
      </div>
      <div className="py-6 flex flex-wrap items-center justify-center gap-2">
        {userAddressData && (
          <RadioGroup className="w-full h-full flex items-center gap-2 flex-wrap">
            {userAddressData.map((address: any, index: number) => (
              <div
                key={index}
                className={`h-32 w-44 sm:w-36 p-3 bg-secondary text-xs rounded-md ${
                  address.isDefault ? "border" : "border-none"
                }`}
              >
                <div key={address.$id} className="flex items-start space-x-2 ">
                  <RadioGroupItem
                    value={address.$id}
                    id={address.$id}
                    checked={address.isDefault}
                  />
                  <Label htmlFor={address.$id} className="text-xs truncate">
                    <p className="text-wrap">
                      {address.firstName} {address.lastName}
                    </p>
                  </Label>
                </div>
                <div className="my-2 py-2 border-stone-800/50 border-t-[1px] overflow-hidden whitespace-nowrap text-ellipsis">
                  <p className="truncate">
                    {address.phone} <br />
                    {address.address1} <br />
                    {address.address2} <br />
                    {address.city} <br />
                  </p>
                </div>
              </div>
            ))}
            <Dialog>
              <DialogTrigger>
                <Button
                  variant={"secondary"}
                  className="h-32 w-44 sm:w-36 p-2 border border-dashed"
                >
                  <div className="flex flex-col justify-center items-center gap-2 w-full h-full">
                    <CirclePlus size={28} />
                    <p className="text-wrap text-xs">New Address</p>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="px-0">
                <DialogHeader>
                  <DialogTitle className="text-2xl tracking-wider my-5 text-center">
                    ADD A NEW ADDRESS
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Please fill in the information below:
                  </DialogDescription>
                </DialogHeader>
                <NewAddressForm currentUserId={currentUserId} />
              </DialogContent>
            </Dialog>
          </RadioGroup>
        )}
      </div>
    </>
  );
};

export default PrimaryAddress;
