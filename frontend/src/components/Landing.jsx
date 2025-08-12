import  { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Dr Sense</span>
          </div>
          <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Login
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your AI Medical Assistant
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get personalized health guidance, prescription analysis, and maintain your health records with our advanced AI system.
          </p>
          <Link to="/login" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
 