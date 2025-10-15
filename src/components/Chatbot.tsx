import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([
    {
      text: "👋 Hi! I'm Amirlahi's AI assistant. I can help you learn more about his work, projects, or answer any questions you might have! 🚀",
      isBot: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const demoResponses = [
    "That's a great question! Amirlahi has extensive experience in machine learning and data science.",
    "Amirlahi specializes in Python, TensorFlow, PyTorch, and various ML frameworks. Would you like to know more about any specific technology?",
    "Amirlahi has worked on projects ranging from healthcare analytics to computer vision. Check out the projects section for more details!",
    "Feel free to contact Amirlahi directly through the contact form below for more detailed discussions about collaboration opportunities.",
    "Amirlahi's experience includes both academic research and industry applications in AI and machine learning.",
    "Thanks for your interest! Amirlahi is always excited to discuss new opportunities and challenges in data science."
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;
    
    const newMessages = [
      ...messages,
      { text: inputValue, isBot: false }
    ];
    
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
      setIsLoading(false);
    }, 1000);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 max-w-[calc(100vw-3rem)] gradient-border bg-background-secondary border-0 shadow-elegant z-50 animate-slide-in-right">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg gradient-text">Chat with Amirlahi</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 hover:bg-background-tertiary"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Messages */}
            <div className="h-60 overflow-y-auto space-y-3 pr-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-background-tertiary text-foreground'
                        : 'bg-gradient-primary text-background'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-background-tertiary text-foreground max-w-[80%] p-3 rounded-lg text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                      <span className="text-xs text-foreground-muted">Typing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-background border-border focus:border-accent-primary relative z-10"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="btn-gradient text-background px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full btn-gradient text-background shadow-elegant z-50 animate-glow-pulse"
        size="lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </>
  );
};

export default Chatbot;