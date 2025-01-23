import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ArrowBigUp } from "lucide-react";
import Image from "next/image";

function UserMessage({ message }: { message: string }) {
  return (
    <p className="max-w-[65%] bg-gray-100 px-5 py-2 rounded-lg mr-5">
      {message}
    </p>
  );
}

function BotMessage({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2 ml-5">
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
  const message =
    "The primary ethical concern for anthropologists is to conduct their research in a way that does not harm the people, animals, or artifacts they study. This includes respecting the rights, dignity, and well-being of those involved and ensuring that research practices are ethical and responsible.";

  return (
    <div className="flex flex-col h-dvh">
      <header>
        <h1 className="font-bold text-3xl text-center p-5">Gemini API Demo</h1>
      </header>
      <ScrollArea className="h-full">
        {Array.from({ length: 50 }).map((_, index) => (
          <div
            className={`mb-5 flex w-full ${
              index % 2 == 0 ? "justify-end" : "justify-start"
            }`}
            key={index}
          >
            {index % 2 == 0 ? (
              <UserMessage message={message} />
            ) : (
              <BotMessage message={message} />
            )}
          </div>
        ))}
      </ScrollArea>
      <footer className="flex px-5 pb-5 gap-5">
        <Textarea placeholder="Message Gemini" className="resize-none" />
        <Button className="h-full aspect-square">
          <ArrowBigUp />
        </Button>
      </footer>
    </div>
  );
}
