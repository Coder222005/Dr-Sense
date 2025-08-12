import  { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'
import { Clock, MessageCircle, Trash, Eye } from 'lucide-react'

export default function ChatHistory({ user, onLogout }) {
  const [chatThreads, setChatThreads] = useState([])

  useEffect(() => {
    const chatHistory = JSON.parse(localStorage.getItem(`chatHistory_${user.id}`)) || []
    setChatThreads(chatHistory)
  }, [user.id])

  const deleteThread = (threadId) => {
    const updatedThreads = chatThreads.filter(thread => thread.id !== threadId)
    setChatThreads(updatedThreads)
    localStorage.setItem(`chatHistory_${user.id}`, JSON.stringify(updatedThreads))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center mb-8">
            <Clock className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Chat History</h1>
          </div>

          <div className="space-y-4">
            {chatThreads.length > 0 ? (
              chatThreads.map((thread) => (
                <div key={thread.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{thread.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {new Date(thread.timestamp).toLocaleDateString()} at {new Date(thread.timestamp).toLocaleTimeString()}
                      </p>
                      <p className="text-gray-700">{thread.summary}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Link
                        to={`/chat?threadId=${thread.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => deleteThread(thread.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Recent messages:</p>
                    <div className="space-y-2">
                      {thread.messages.slice(-2).map((msg, idx) => (
                        <div key={idx} className="text-sm">
                          <span className={`font-medium ${msg.type === 'user' ? 'text-blue-600' : 'text-green-600'}`}>
                            {msg.type === 'user' ? 'You' : 'AI'}:
                          </span>
                          <span className="ml-2 text-gray-700">
                            {msg.content.length > 100 ? `${msg.content.substring(0, 100)}...` : msg.content}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No chat history</h3>
                <p className="text-gray-600 mb-6">Start a conversation with the AI assistant to see your chat history here.</p>
                <Link
                  to="/chat"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Start New Chat
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
 