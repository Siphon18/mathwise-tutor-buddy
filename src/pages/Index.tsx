import { useState } from "react";
import axios from "axios";
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
  // State declarations for messages, input, selected topic and loading indicator
  const [messages, setMessages] = useState<{ text: string; isAi: boolean }[]>([
    {
      text: "Hello! I'm your AI math tutor. Please select a topic you'd like to learn about.",
      isAi: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Define topics with their respective prompts
  const topics = [
    {
      title: "Algebra",
      description: "Master equations and variables",
      icon: <Binary className="w-6 h-6 text-primary" />,
      prompt:
        "You are an expert algebra tutor. Focus on explaining algebraic concepts, equations, variables, and problem-solving techniques. Break down complex algebraic problems into simple steps. Current question: ",
    },
    {
      title: "Geometry",
      description: "Explore shapes and spaces",
      icon: <PiSquare className="w-6 h-6 text-primary" />,
      prompt:
        "You are an expert geometry tutor. Focus on shapes, spatial relationships, angles, and geometric proofs. Use visual explanations and step-by-step geometric problem solving. Current question: ",
    },
    {
      title: "Calculus",
      description: "Learn about rates of change",
      icon: <Sigma className="w-6 h-6 text-primary" />,
      prompt:
        "You are an expert calculus tutor. Focus on derivatives, integrals, limits, and rates of change. Explain calculus concepts with practical examples and clear steps. Current question: ",
    },
    {
      title: "Basic Math",
      description: "Strengthen your foundations",
      icon: <Calculator className="w-6 h-6 text-primary" />,
      prompt:
        "You are an expert in basic mathematics. Focus on arithmetic, fractions, decimals, and percentages. Provide clear, simple explanations with practical examples. Current question: ",
    },
  ];

  // Handler for sending messages to the backend
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const selectedTopicData = topics.find(
      (topic) => topic.title === selectedTopic
    );
    if (!selectedTopicData) return;

    // Append the user's message to the chat immediately
    setMessages((prev) => [
      ...prev,
      { text: inputMessage, isAi: false },
    ]);
    setLoading(true);

    // Construct the system message with additional formatting instructions
    const systemMessage =
      selectedTopicData.prompt 

    // For debugging, log the constructed prompt
    console.log("System Message:", systemMessage);
    console.log("User Message:", inputMessage);

    try {
      const response = await axios.post(
        "http://localhost:5020/api/sendMessage",
        { systemMessage, userMessage: inputMessage },
        { headers: { "Content-Type": "application/json" } }
      );

      // Log the raw response for debugging
      console.log("API Response:", response.data);
      
      setMessages((prev) => [
        ...prev,
        { text: response.data.response || "No response returned.", isAi: true },
      ]);
    } catch (error: any) {
      // Log detailed error info to help debugging
      console.error("Error contacting AI service:", error.response || error.message);
      setMessages((prev) => [
        ...prev,
        { text: "Error contacting AI service. Please try again later.", isAi: true },
      ]);
    } finally {
      setLoading(false);
      setInputMessage("");
    }
  };

  // Handler for selecting a topic
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
        <p
          className="text-center text-gray-600 mb-8 animate-fadeIn"
          style={{ animationDelay: "200ms" }}
        >
          Your personal AI tutor for mathematics
        </p>

        {/* Topics Grid */}
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

        {/* Chat and Input Area */}
        <div
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-4 animate-fadeIn"
          style={{ animationDelay: "400ms" }}
        >
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
              placeholder={
                selectedTopic
                  ? `Ask your ${selectedTopic.toLowerCase()} question...`
                  : "Please select a topic first..."
              }
              className="flex-1"
              disabled={!selectedTopic || loading}
            />
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90"
              disabled={!selectedTopic || loading}
            >
              {loading ? "Loading..." : <Send className="w-4 h-4" />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
