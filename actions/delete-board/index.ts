"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { DeleteBoard } from "./schema";
import { InputType, ReturnType } from "./types";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { redirect } from "next/navigation";
import { createAuditLog } from "@/lib/ceate-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { decreaseAvailableCount } from "@/lib/org-limit";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id } = data;
  let board;

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

    await decreaseAvailableCount();

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to update.",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = CreateSafeAction(DeleteBoard, handler);
