
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { sampleChat } from "@/lib/mockData";
import { Pill, Send } from 'lucide-react';
import { ChatMessage, ChatRole } from '@/types/chat';
import { formulas, diseases } from '@/lib/mockData';
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(
    sampleChat.map(msg => ({
      ...msg,
      role: msg.role as ChatRole
    }))
  );
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [detectedDiseases, setDetectedDiseases] = useState<number[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Analyze symptoms and generate a response
  const analyzeSymptoms = (symptomText: string) => {
    const lowerCaseSymptoms = symptomText.toLowerCase();
    let possibleConditions = [];
    
    // Match symptoms with diseases
    for (const disease of diseases) {
      let matchCount = 0;
      let totalSymptoms = disease.symptoms.length;
      
      for (const symptom of disease.symptoms) {
        if (lowerCaseSymptoms.includes(symptom.toLowerCase())) {
          matchCount++;
        }
      }
      
      // Calculate confidence score
      if (matchCount > 0) {
        const confidence = Math.min(100, Math.round((matchCount / totalSymptoms) * 100));
        possibleConditions.push({
          condition: disease.name,
          confidence,
          diseaseId: disease.id
        });
      }
    }
    
    // Sort conditions by confidence
    possibleConditions.sort((a, b) => b.confidence - a.confidence);
    
    // Generate response based on matches
    if (possibleConditions.length === 0) {
      return { 
        response: "I need more information about your symptoms to provide suggestions. Could you give more details?",
        detectedDiseaseIds: []
      };
    }
    
    const detectedDiseaseIds = possibleConditions.map(c => c.diseaseId);
    const topCondition = possibleConditions[0];
    const matchingFormulas = formulas.filter(f => f.diseaseId === topCondition.diseaseId);
    
    // Build response
    let response = `Based on your symptoms, there's a ${topCondition.confidence}% likelihood of **${topCondition.condition}**.\n\n`;
    
    if (matchingFormulas.length > 0) {
      response += `Here are some formulas that might help:\n\n`;
      matchingFormulas.forEach(formula => {
        response += `• **${formula.name}**: ${formula.description}\n`;
        response += `  Key components: ${formula.components.join(', ')}\n\n`;
      });
    }
    
    return { response, detectedDiseaseIds };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      id: messages.length + 1,
      role: 'user' as ChatRole,
      content: inputMessage
    }]);
    setInputMessage('');
    
    // Show AI typing indicator
    setIsTyping(true);
    
    // Analyze and respond after a delay
    setTimeout(() => {
      const analysis = analyzeSymptoms(inputMessage);
      
      setMessages(prev => [...prev, {
        id: messages.length + 2,
        role: 'ai' as ChatRole,
        content: analysis.response
      }]);
      
      setIsTyping(false);
      setDetectedDiseases(analysis.detectedDiseaseIds);
      
      toast({
        title: "Analysis Complete",
        description: "AI analysis of your symptoms is ready.",
      });
    }, 1000);
  };

  // Handle Enter key to send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="border-health-100 shadow-lg">
      <div className="bg-gradient-to-r from-health-600 to-remedy-500 p-4 flex items-center gap-2">
        <h3 className="font-medium text-white">AI Health Assistant</h3>
      </div>
      
      <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-white to-health-50">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`${message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
          >
            <div 
              className={`p-3 rounded-lg max-w-[85%] ${
                message.role === 'user' 
                  ? 'bg-health-100 text-health-800' 
                  : 'bg-remedy-50 text-remedy-800 border border-remedy-100'
              }`}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {message.role === 'ai' && <Pill className="h-4 w-4 mb-1 text-remedy-500" />}
              {message.content}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="p-3 rounded-lg bg-remedy-50 text-remedy-800 border border-remedy-100 flex space-x-2 items-center">
              <div className="w-2 h-2 bg-remedy-300 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-remedy-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-remedy-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <CardContent className="border-t border-health-100 p-4">
        <div className="flex flex-col gap-2">
          <Textarea
            placeholder="Describe your symptoms..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="border-health-200 min-h-[80px]"
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">Press Enter to send</p>
            <Button 
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-health-600 to-remedy-500"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
        <div className="mt-3 p-2 bg-remedy-50 rounded-lg border border-remedy-100">
          <p className="text-xs text-muted-foreground">
            For informational purposes only. Always consult healthcare professionals.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
