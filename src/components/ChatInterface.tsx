
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { sampleChat } from "@/lib/mockData";
import { MessageSquare, Send } from 'lucide-react';

interface ChatMessage {
  id: number;
  role: 'user' | 'ai';
  content: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(sampleChat);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      role: 'user' as const,
      content: inputMessage
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: 'ai' as const,
        content: "Based on the symptoms you've described, I can provide information about potential causes and natural approaches. Would you like me to analyze these symptoms in more detail or suggest a formula that might help?"
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Card className="border-health-100 shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-health-50 p-3 flex items-center gap-2 border-b border-health-100">
          <MessageSquare className="h-5 w-5 text-health-600" />
          <h3 className="font-medium text-health-800">AI Health Assistant</h3>
        </div>
        
        <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-white">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`chat-bubble ${message.role === 'user' ? 'user-message' : 'ai-message'} animate-fade-in`}
            >
              {message.content}
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-bubble ai-message flex space-x-2 items-center">
              <div className="w-2 h-2 bg-remedy-300 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-remedy-400 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-remedy-500 rounded-full animate-pulse delay-200"></div>
            </div>
          )}
        </div>
        
        <div className="border-t border-health-100 p-3 bg-white">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Describe your symptoms or ask a health question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="border-health-200 focus:ring-health-500"
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-health-600 hover:bg-health-700"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            This AI health assistant is for informational purposes only. Always consult with healthcare professionals for medical advice.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
