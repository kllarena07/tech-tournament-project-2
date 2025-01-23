"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ArrowBigUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function UserMessage({ message }: { message: string }) {
  return (
    <p className="ml-auto max-w-[65%] bg-gray-100 px-3.5 py-3 rounded-2xl mr-5">
      {message}
    </p>
  );
}

function BotMessage({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2 px-5">
      <Image
        src="/gemini-icon.png"
        width={24}
        height={24}
        alt="Google Gemini"
        className="shadow-[0_0_5px_rgba(0,0,0,0.5)] w-[24px] h-[24px] rounded-full bg-white flex-shrink-0"
      />
      <p className="w-full ml-2">{message}</p>
    </div>
  );
}

export default function Home() {
  const [chatHistory, setChatHistory] = useState<
    { role: string; message: string }[]
  >([]);
  const [userMessage, setUserMessage] = useState("");

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUserMessage(event.target.value);
  };

  const postUserMessage = () => {
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { role: "user", message: userMessage },
    ]);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage, history: chatHistory }),
    })
      .then((response) => response.json())
      .then((data) => {
        setChatHistory(() => [...data.history]);
        setUserMessage("");
      })
      .catch((error) => {
        console.error("Error posting message:", error);
      });
  };

  return (
    <div className="flex flex-col h-dvh">
      <header>
        <h1 className="font-bold text-3xl text-center p-5">Gemini API Demo</h1>
      </header>
      <ScrollArea className="h-full">
        {chatHistory.length > 0 &&
          chatHistory.map(
            (chat: { role: string; message: string }, index: number) => (
              <div className="mb-5 flex w-full" key={index}>
                {chat.role === "user" ? (
                  <UserMessage message={chat.message} />
                ) : (
                  <BotMessage message={chat.message} />
                )}
              </div>
            )
          )}
      </ScrollArea>
      <footer className="flex px-5 pb-5 gap-5">
        <Textarea
          placeholder="Message Gemini"
          value={userMessage}
          className="resize-none"
          onChange={handleTextAreaChange}
        />
        <Button className="h-full aspect-square" onClick={postUserMessage}>
          <ArrowBigUp />
        </Button>
      </footer>
    </div>
  );
}
