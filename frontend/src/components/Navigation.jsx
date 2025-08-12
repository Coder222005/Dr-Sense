import  { Link, useLocation } from 'react-router-dom'
import { Activity, Home, MessageCircle, User, LogOut, Clock } from 'lucide-react'

export default function Navigation({ user, onLogout }) {
  const location = useLocation()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Dr Sense</span>
            </Link>
            
            <div className="flex space-x-1">
              <Link 
                to="/dashboard" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/dashboard' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              
              <Link 
                to="/chat" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/chat' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat</span>
              </Link>
              
              <Link 
                to="/profile" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/profile' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              
              <Link 
                to="/chat-history" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/chat-history' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Clock className="h-4 w-4" />
                <span>History</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
 