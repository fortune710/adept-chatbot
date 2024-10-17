import ChatSessionMesssages from "@/components/chat-session-messages";

export default function ChatPage() {
  return (
    <main className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <ChatSessionMesssages />
    </main>
  );
}
