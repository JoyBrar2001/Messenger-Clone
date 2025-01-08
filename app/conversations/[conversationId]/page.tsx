import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import Body from "@/components/conversations/Body";
import Form from "@/components/conversations/Form";
import Header from "@/components/conversations/Header";
import EmptyState from "@/components/EmptyState";

interface IParams {
  conversationId: string;
};

export default async function ConversationIdPage({ params }: { params: IParams }) {
  const { conversationId } = await Promise.resolve(params);

  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="min-h-screen h-full flex flex-col">
        <Header conversation={conversation} />
        <div className="flex-1">
          <Body initialMessages={messages} />
        </div>
        <Form />
      </div>
    </div>
  );
}