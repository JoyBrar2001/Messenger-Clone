"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Conversation, User } from "@prisma/client";
import { MdOutlineGroupAdd } from "react-icons/md";

import { FullConversationType } from "@/types";
import useConversation from "@/hooks/useConversation";
import ConversationBox from "@/components/conversations/ConversationBox";
import GroupChatModal from "@/components/modals/GroupChatModal";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
};

export default function ConversationList({
  initialItems,
  users
}: ConversationListProps) {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <>
      <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={users}
      />

      <aside className={clsx(
        "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
        isOpen ? "hidden" : "block w-full left-0"
      )}>
        <div className="px-5">
          <div className="flex justify-between items-center mb-4 pt-4">
            <h1 className="text-2xl font-bold text-neutral-800">
              Messages
            </h1>

            <div
              className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
              onClick={() => setIsModalOpen(true)}
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>

          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
}