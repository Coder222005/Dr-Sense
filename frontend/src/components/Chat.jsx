import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import { Send } from 'lucide-react';

export default function Chat({ user, onLogout }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const threadId = searchParams.get('threadId');

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content:
        "Hello! I'm your AI medical assistant. I can help answer health questions. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentThreadId, setCurrentThreadId] = useState(
    threadId || Date.now().toString()
  );

  useEffect(() => {
    if (threadId) {
      const chatHistory = JSON.parse(localStorage.getItem(`chatHistory_${user.id}`)) || [];
      const thread = chatHistory.find((t) => t.id === threadId);
      if (thread) {
        setMessages(thread.messages);
        setCurrentThreadId(threadId);
      }
    }
  }, [threadId, user.id]);

  const saveToHistory = (messages) => {
    const chatHistory = JSON.parse(localStorage.getItem(`chatHistory_${user.id}`)) || [];
    const existingThreadIndex = chatHistory.findIndex(
      (t) => t.id === currentThreadId
    );

    const userProfile = JSON.parse(localStorage.getItem(`profile_${user.id}`)) || {};
    const firstUserMessage =
      messages.find((m) => m.type === 'user')?.content || 'New Chat';

    const threadData = {
      id: currentThreadId,
      title:
        firstUserMessage.length > 50
          ? `${firstUserMessage.substring(0, 50)}...`
          : firstUserMessage,
      summary: `Chat with ${messages.length} messages`,
      timestamp: Date.now(),
      messages: messages,
      userProfile: userProfile,
    };

    if (existingThreadIndex >= 0) {
      chatHistory[existingThreadIndex] = threadData;
    } else {
      chatHistory.push(threadData);
    }

    localStorage.setItem(`chatHistory_${user.id}`, JSON.stringify(chatHistory));
  };

  const getPersonalizedPrompt = () => {
    const profile = JSON.parse(localStorage.getItem(`profile_${user.id}`)) || {};
    let prompt = `You are a helpful medical AI assistant. Your response should be structured and detailed. For any query, provide the following information:
- Recommended Dosage: (If applicable)
- Recommended Food Items:
- Other Medications: (Potential interactions)
- Side Effects:

Always recommend consulting healthcare professionals for medical advice.`;

    if (profile.age || profile.gender || profile.allergies || profile.conditions) {
      prompt += `\n\nUser Profile:
- Age: ${profile.age || 'Not specified'}
- Gender: ${profile.gender || 'Not specified'}`;
      if (profile.allergies) prompt += `\n- Allergies: ${profile.allergies}`;
      if (profile.conditions) prompt += `\n- Medical conditions: ${profile.conditions}`;
      if (profile.medications) prompt += `\n- Current medications: ${profile.medications}`;
      prompt += '\nPlease provide personalized recommendations based on this information.';
    }
    
    return prompt;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://bommireddyvenkatadheerajreddy--example-vllm-openai-compa-cc7374.modal.run/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer gotchafree',
          },
          body: JSON.stringify({
            model: 'mistralai/Mistral-7B-Instruct-v0.3',
            messages: [
              {
                role: 'system',
                content: getPersonalizedPrompt(),
              },
              { role: 'user', content: input },
            ],
            temperature: 0.2,
            max_tokens: 512,
          }),
        }
      );

      const data = await response.json();
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content:
          data.choices?.[0]?.message?.content ||
          "I apologize, but I'm having trouble responding right now. Please try again later.",
      };
      const finalMessages = [...newMessages, botResponse];
      setMessages(finalMessages);
      saveToHistory(finalMessages);
    } catch (error) {
      const errorResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'An error occurred. Please try again later.',
      };
      const finalMessages = [...newMessages, errorResponse];
      setMessages(finalMessages);
      saveToHistory(finalMessages);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onLogout={onLogout} />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-md h-[600px] flex flex-col">
          <div className="p-6 border-b">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                AI Medical Assistant
              </h1>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <p className="text-sm text-gray-600">Thinking...</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about health, medications..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}