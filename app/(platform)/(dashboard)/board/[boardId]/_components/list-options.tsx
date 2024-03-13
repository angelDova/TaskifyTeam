"use client";

import { ElementRef, useRef } from "react";
import { toast } from "sonner";
import { Copy, MoreHorizontal, Trash, X } from "lucide-react";
import { List } from "@prisma/client";

import { deleteList } from "@/actions/delete-list";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/form/form-submit";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { copyList } from "@/actions/copy-list";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess(data) {
      toast.success(`List "${data.title} deleted!`);
      closeRef.current?.click();
    },
    onError(error) {
      toast.error(error);
    },
  });
  const { execute: executeCopy } = useAction(copyList, {
    onSuccess(data) {
      toast.success(`List "${data.title} copied!`);
      closeRef.current?.click();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({
      id,
      boardId,
    });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({
      id,
      boardId,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3 " side="bottom" align="start">
        <div className="text-sm font-medium text-center pb-4 ">
          | List Actions |
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2"
            variant={"ghost"}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-md w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant={"ghost"}
        >
          Add Card 🌅
        </Button>
        <form action={onCopy} className="">
          <input hidden name="id" id="id" value={data.id} className="" />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
            className=""
          />
          <FormSubmit
            variant="ghost"
            className="rounded-md w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy list
            <Copy className="h-4 w-4 ml-2" />
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete} className="">
          <input hidden name="id" id="id" value={data.id} className="" />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
            className=""
          />
          <FormSubmit
            variant="ghost"
            className="rounded-md w-full h-auto p-2 px-5 justify-start font-normal text-sm hover:bg-red-600"
          >
            Delete list
            <Trash className="h-4 w-4 ml-2" />
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
