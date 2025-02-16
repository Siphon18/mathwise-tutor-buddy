
import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { TopicCard } from "@/components/TopicCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calculator,
  Binary,
  PiSquare,
  Sigma,
  Send,
} from "lucide-react";

const Index = () => {
  const [messages, setMessages] = useState<{ text: string; isAi: boolean }[]>([
    {
      text: "Hello! I'm your AI math tutor. Please select a topic you'd like to learn about.",
      isAi: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topics = [
    {
      title: "Algebra",
      description: "Master equations and variables",
      icon: <Binary className="w-6 h-6" />,
      prompt: "You are an expert algebra tutor. Focus on explaining algebraic concepts, equations, variables, and problem-solving techniques. Break down complex algebraic problems into simple steps. Current question: ",
    },
    {
      title: "Geometry",
      description: "Explore shapes and spaces",
      icon: <PiSquare className="w-6 h-6" />,
      prompt: "You are an expert geometry tutor. Focus on shapes, spatial relationships, angles, and geometric proofs. Use visual explanations and step-by-step geometric problem solving. Current question: ",
    },
    {
      title: "Calculus",
      description: "Learn about rates of change",
      icon: <Sigma className="w-6 h-6" />,
      prompt: "You are an expert calculus tutor. Focus on derivatives, integrals, limits, and rates of change. Explain calculus concepts with practical examples and clear steps. Current question: ",
    },
    {
      title: "Basic Math",
      description: "Strengthen your foundations",
      icon: <Calculator className="w-6 h-6" />,
      prompt: "You are an expert in basic mathematics. Focus on arithmetic, fractions, decimals, and percentages. Provide clear, simple explanations with practical examples. Current question: ",
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const selectedTopicData = topics.find(topic => topic.title === selectedTopic);
    let aiResponse = "Please select a topic first to get a more focused response.";

    if (selectedTopicData) {
      aiResponse = "Let me help you with your " + selectedTopicData.title.toLowerCase() + " question. I'll explain this step by step...";
    }

    const newMessages = [
      ...messages,
      { text: inputMessage, isAi: false },
      { text: aiResponse, isAi: true },
    ];
    
    setMessages(newMessages);
    setInputMessage("");
  };

  const handleTopicSelect = (topicTitle: string) => {
    setSelectedTopic(topicTitle);
    setMessages([
      {
        text: `Great choice! I'm ready to help you with ${topicTitle}. What would you like to know?`,
        isAi: true,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-background">
      <div className="container py-8 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 animate-fadeIn">
          MathWise Tutor
        </h1>
        <p className="text-center text-gray-600 mb-8 animate-fadeIn" style={{ animationDelay: "200ms" }}>
          Your personal AI tutor for mathematics
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {topics.map((topic, index) => (
            <div key={topic.title} style={{ animationDelay: `${index * 100}ms` }}>
              <TopicCard
                {...topic}
                selected={selectedTopic === topic.title}
                onClick={() => handleTopicSelect(topic.title)}
              />
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-4 animate-fadeIn" style={{ animationDelay: "400ms" }}>
          <div className="h-[400px] overflow-y-auto mb-4 p-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.text}
                isAi={message.isAi}
                animationDelay={index * 300}
              />
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={selectedTopic ? `Ask your ${selectedTopic.toLowerCase()} question...` : "Please select a topic first..."}
              className="flex-1"
              disabled={!selectedTopic}
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={!selectedTopic}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
