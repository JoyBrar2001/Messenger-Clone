import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";

interface IParams {
  conversationId: string;
};

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = await Promise.resolve(params);

    if (!conversationId) {
      return new NextResponse("Conversation ID is required", { status: 400 });
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    // if (deletedConversation.count === 0) {
    //   return new NextResponse("No conversation found to delete", { status: 404 });
    // }

    existingConversation.users.forEach((user) => {
      if(user.email){
        pusherServer.trigger(user.email, "conversation:remove", existingConversation);
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (error: any) {
    console.error("Error message in delete chat route : ", error.stack);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}