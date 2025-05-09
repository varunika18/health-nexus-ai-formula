
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { sampleChat } from "@/lib/mockData";
import { MessageSquare, Send, Pill, Stethoscope, BrainCircuit } from 'lucide-react';
import { ChatMessage, ChatRole } from '@/types/chat';
import { formulas, diseases } from '@/lib/mockData';
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DiseaseAnalysis } from "@/components/DiseaseAnalysis";

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(
    // Fix the type issue by explicitly casting the sample chat data to ChatMessage[]
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

  // Function to analyze symptoms and suggest remedies with improved accuracy
  const analyzeSymptoms = (symptomText: string): { response: string; detectedDiseaseIds: number[] } => {
    // Convert input to lowercase for case-insensitive matching
    const lowerCaseSymptoms = symptomText.toLowerCase();
    
    // Check for common symptoms and map them to possible conditions with confidence scores
    let possibleConditions: { condition: string; confidence: number; diseaseId: number }[] = [];
    
    // Check symptoms against each disease in our database
    diseases.forEach(disease => {
      let matchCount = 0;
      let totalSymptoms = disease.symptoms.length;
      
      disease.symptoms.forEach(symptom => {
        if (lowerCaseSymptoms.includes(symptom.toLowerCase())) {
          matchCount++;
        }
      });
      
      // Calculate a confidence score - more matching symptoms = higher confidence
      if (matchCount > 0) {
        const confidenceScore = Math.min(100, Math.round((matchCount / totalSymptoms) * 100));
        
        possibleConditions.push({
          condition: disease.name,
          confidence: confidenceScore,
          diseaseId: disease.id
        });
      }
    });
    
    // Sort by confidence score (highest first)
    possibleConditions.sort((a, b) => b.confidence - a.confidence);
    
    // If no conditions matched, provide a general response
    if (possibleConditions.length === 0) {
      return { 
        response: `Based on the symptoms you've described, I don't have enough information to suggest a specific formula. Could you provide more details about what you're experiencing? Include information like duration, severity, and any other symptoms.`,
        detectedDiseaseIds: []
      };
    }
    
    // Get the disease IDs for detected conditions
    const detectedDiseaseIds = possibleConditions.map(condition => condition.diseaseId);
    
    // Find matching formulas for top conditions
    const topCondition = possibleConditions[0];
    const matchingFormulas = formulas.filter(formula => 
      formula.diseaseId === topCondition.diseaseId
    );
    
    // Construct response with matched formulas
    let response = `Based on your symptoms, there's a ${topCondition.confidence}% likelihood you may be experiencing **${topCondition.condition}**.\n\n`;
    
    if (possibleConditions.length > 1) {
      response += `I've also detected possible signs of ${possibleConditions.slice(1, 3).map(c => `${c.condition} (${c.confidence}% confidence)`).join(', ')}.\n\n`;
    }
    
    if (matchingFormulas.length > 0) {
      response += `Here are some formulas that might help with ${topCondition.condition}:\n\n`;
      
      matchingFormulas.forEach(formula => {
        response += `• **${formula.name}**: ${formula.description}\n`;
        response += `  Key components: ${formula.components.join(', ')}\n`;
        response += `  Effectiveness rating: ${formula.effectiveness}%\n\n`;
      });
      
      response += `Please consult with a healthcare professional before trying any new treatment. Would you like more detailed information about any of these formulas?`;
    } else {
      response += `I don't have a specific formula recommendation for ${topCondition.condition} in my database. I recommend consulting with a healthcare professional for proper diagnosis and treatment.`;
    }
    
    return { response, detectedDiseaseIds };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      role: 'user' as ChatRole,
      content: inputMessage
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Analyze symptoms and generate response
    const analysis = analyzeSymptoms(inputMessage);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponseMessage: ChatMessage = {
        id: messages.length + 2,
        role: 'ai' as ChatRole,
        content: analysis.response
      };
      
      setMessages(prev => [...prev, aiResponseMessage]);
      setIsTyping(false);
      setDetectedDiseases(analysis.detectedDiseaseIds);
      
      // Show toast notification
      toast({
        title: "Analysis Complete",
        description: "Our AI has analyzed your symptoms and provided personalized recommendations.",
      });
    }, 1500);
  };

  // Handle key press (Enter to send, Shift+Enter for new line)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="border-health-100 shadow-lg overflow-hidden rounded-xl bg-white">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-health-600 to-remedy-500 p-4 flex items-center gap-2 border-b border-health-100">
          <BrainCircuit className="h-5 w-5 text-white" />
          <h3 className="font-medium text-white">AI Health Assistant</h3>
        </div>
        
        <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-white to-health-50">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`chat-bubble ${message.role === 'user' ? 'user-message' : 'ai-message'} animate-fade-in`}
            >
              <div className="flex items-start gap-2">
                {message.role === 'ai' && <Pill className="h-4 w-4 mt-1 text-remedy-500" />}
                <div 
                  className={`p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-health-100 text-health-800 ml-auto shadow-sm' 
                      : 'bg-remedy-50 text-remedy-800 border border-remedy-100 shadow-sm'
                  }`}
                  style={{ 
                    maxWidth: '85%',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-bubble ai-message">
              <div className="flex items-start gap-2">
                <Pill className="h-4 w-4 mt-1 text-remedy-500" />
                <div className="p-3 rounded-lg bg-remedy-50 text-remedy-800 border border-remedy-100 flex space-x-2 items-center shadow-sm">
                  <div className="w-2 h-2 bg-remedy-300 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-remedy-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-remedy-500 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t border-health-100 p-4 bg-white">
          <div className="flex flex-col gap-2">
            <Textarea
              placeholder="Describe your symptoms in detail (e.g., I've been experiencing headaches, feeling dizzy, and have had some nosebleeds recently...)"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="border-health-200 focus:ring-health-500 min-h-[80px] resize-none rounded-lg"
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                Press Enter to send, Shift+Enter for new line
              </p>
              <Button 
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-health-600 to-remedy-500 hover:from-health-700 hover:to-remedy-600 flex items-center gap-2 rounded-full transition-all shadow-md"
              >
                <Send className="h-4 w-4" />
                <span>Send</span>
              </Button>
            </div>
          </div>
          <div className="mt-3 p-2 bg-remedy-50 rounded-lg border border-remedy-100">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Stethoscope className="h-3 w-3" />
              <span>This AI health assistant is for informational purposes only. Always consult with healthcare professionals for medical advice.</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
