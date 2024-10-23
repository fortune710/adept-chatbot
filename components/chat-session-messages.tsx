'use client'
import ChatInput from "@/components/chat-input";
import ChatMessage from "@/components/chat-message";
import { cn } from "@/lib/utils";
import { useChat } from 'ai/react';
import LoadingSpinner from "./loading-spinner";


export default function ChatSessionMesssages({
  className,
}: {
  className?: string;
}) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    keepLastMessageOnError: true,
  });


  return (
    <div
      className={cn(
        "h-[89%] 2xl:h-[89%] max-md:h-[65%] max-sm:h-[65%] flex flex-col max-w-2xl gap-4 mx-auto",
        className,
      )}
    >
      <div className="flex-1 overflow-auto">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            isAi={message.role !== 'user'}
            content={message.content}
          />
        ))}

        { isLoading && <LoadingSpinner/> }
        { error && <p>Error Ocurred: Failed to load data</p> }
      </div>
      <ChatInput 
        input={input}
        onHandleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
