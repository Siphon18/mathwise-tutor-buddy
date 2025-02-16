
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isAi: boolean;
  animationDelay?: number;
}

export const ChatMessage = ({ message, isAi, animationDelay = 0 }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 opacity-0 animate-fadeIn",
        isAi ? "justify-start" : "justify-end"
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl",
          isAi
            ? "bg-secondary text-secondary-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        {message}
      </div>
    </div>
  );
};
