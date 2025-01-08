import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import ConversationList from "@/components/conversations/ConversationList";
import getConversations from "@/actions/getConversations";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode
}) {
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className="min-h-screen h-full">
        <ConversationList
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}