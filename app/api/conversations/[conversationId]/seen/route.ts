import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  conversationId?: string;
};

export async function POST(
  request: NextRequest
) {
  try {
    const currentUser = await getCurrentUser();

    const pathname = request.nextUrl.pathname.split("/");
    const conversationId = pathname[pathname.length - 2];

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid Id", { status: 400 });
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updatedMessages = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    await pusherServer.trigger(currentUser.email, "conversation:update", {
      id: conversationId,
      messages: [updatedMessages],
    });

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    await pusherServer.trigger(conversationId!, "messages:update", updatedMessages);

    return NextResponse.json(updatedMessages);
  } catch (error) {
    console.log("Error message : ", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}