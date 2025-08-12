import  { Link } from 'react-router-dom'
import Navigation from './Navigation'
import { MessageCircle, User, Clock, Camera } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Dashboard({ user, onLogout }) {
  const [recentChats, setRecentChats] = useState([])

  useEffect(() => {
    const chatHistory = JSON.parse(localStorage.getItem(`chatHistory_${user.id}`)) || []
    setRecentChats(chatHistory.slice(-3))
  }, [user.id])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome back, {user.name}!</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link to="/chat" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <MessageCircle className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Chat Assistant</h3>
            <p className="text-gray-600">Get medical guidance and prescription analysis</p>
          </Link>

          <Link to="/profile" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <User className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Health Profile</h3>
            <p className="text-gray-600">Manage your health information</p>
          </Link>

          <Link to="/chat-history" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <Clock className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Chat History</h3>
            <p className="text-gray-600">View past conversations</p>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Conversations</h2>
          <div className="space-y-4">
            {recentChats.length > 0 ? (
              recentChats.map((chat, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium">{chat.title}</p>
                    <p className="text-sm text-gray-600">{new Date(chat.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No recent conversations. Start chatting with AI assistant!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
 