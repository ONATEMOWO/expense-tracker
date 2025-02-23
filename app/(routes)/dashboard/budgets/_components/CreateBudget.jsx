"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.jsx";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { db } from "@/utils/dbconfig";

const CreateBudget = ({ refereshData }) => {
  const [emojiIcon, setEmojiIcon] = useState("😁");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const { user } = useUser();
  const onCreateBudget = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon,
      })
      .returning({ insertedId: Budgets.id });

    if (result) {
      refereshData();
      toast("New Budget Created!");
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[530px] bg-gray-50 ">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Create New Budget
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              <Button
                className="text-lg"
                variant="outline"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
              >
                {emojiIcon}
              </Button>
              <div className="absolute z-20">
                <EmojiPicker
                  open={openEmojiPicker}
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                  }}
                />
              </div>

              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Name</h2>
                <Input
                  placeholder="e.g School Supplies"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                <Input
                  type="number"
                  placeholder="e.g $2000"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onCreateBudget()}
                className="mt-5 w-full"
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>

        {/* <DialogContent className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
  overlayClassName="fixed inset-0 bg-black/50">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Create New Budget
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
                <Button 
                  variant="outline" 
                  onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
              <div className="absolute">
                <EmojiPicker />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent> */}
      </Dialog>
    </div>
  );
};

export default CreateBudget;
