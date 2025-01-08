"use server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function getConversationById(conversationId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (error) {
    console.log("Error in getting conversation : ", error);

    return null;
  }
}