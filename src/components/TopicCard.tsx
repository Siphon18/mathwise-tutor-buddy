
import { cn } from "@/lib/utils";

interface TopicCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export const TopicCard = ({
  title,
  description,
  icon,
  selected = false,
  onClick,
}: TopicCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-6 rounded-xl transition-all duration-300 cursor-pointer",
        "backdrop-blur-sm border hover:shadow-lg",
        selected
          ? "bg-primary/10 border-primary"
          : "bg-white/50 border-gray-200 hover:border-primary/50"
      )}
    >
      <div className="mb-3 text-primary">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};
