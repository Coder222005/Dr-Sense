import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity, Mail, Lock, User, HelpCircle } from 'lucide-react'

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [securityQuestion, setSecurityQuestion] = useState('')
  const [securityAnswer, setSecurityAnswer] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [resetAnswer, setResetAnswer] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const securityQuestions = [
    "What was the name of your first pet?",
    "What city were you born in?",
    "What is your mother's maiden name?",
    "What was your first car model?",
    "What elementary school did you attend?"
  ]

   const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    
    let users = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Add demo admin user if not exists
    if (!users.find(u => u.email === 'admin@hello.com')) {
      users.push({
        id: 1,
        email: 'admin@hello.com',
        password: 'admin',
        name: 'Admin Demo',
        securityQuestion: 'What was the name of your first pet?',
        securityAnswer: 'demo'
      })
      localStorage.setItem('users', JSON.stringify(users))
    }
    
    const user = users.find(u => u.email === email && u.password === password) 
    
    if (user) {
      onLogin({ id: user.id, email: user.email, name: user.name })
      navigate('/dashboard')
    } else {
      setError('Invalid email or password')
    }
  }

  const handleSignup = (e) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (!securityQuestion || !securityAnswer) {
      setError('Please select a security question and provide an answer')
      return
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    if (users.find(u => u.email === email)) {
      setError('Email already exists')
      return
    }
    
    const newUser = {
      id: Date.now(),
      email,
      password,
      name,
      securityQuestion,
      securityAnswer: securityAnswer.toLowerCase()
    }
    
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    
    onLogin({ id: newUser.id, email: newUser.email, name: newUser.name })
    navigate('/dashboard')
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    setError('')
    
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === resetEmail)
    
    if (!user) {
      setError('Email not found')
      return
    }
    
    if (user.securityAnswer !== resetAnswer.toLowerCase()) {
      setError('Incorrect security answer')
      return
    }
    
    user.password = newPassword
    localStorage.setItem('users', JSON.stringify(users))
    
    setMode('login')
    setError('')
    setResetEmail('')
    setResetAnswer('')
    setNewPassword('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Activity className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
            </h2>
            <p className="text-gray-600">
              {mode === 'login' ? 'Sign in to your account' : mode === 'signup' ? 'Join our healthcare platform' : 'Recover your account'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium">
                Sign In
              </button>

              <div className="text-center space-y-2">
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Forgot your password?
                </button>
                <div>
                  <span className="text-gray-600 text-sm">Don't have an account? </span>
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </form>
          )}

          {mode === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Security Question</label>
                <div className="relative">
                  <HelpCircle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    value={securityQuestion}
                    onChange={(e) => setSecurityQuestion(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a security question</option>
                    {securityQuestions.map((question, index) => (
                      <option key={index} value={question}>{question}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Security Answer</label>
                <input
                  type="text"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your answer"
                  required
                />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium">
                Create Account
              </button>

              <div className="text-center">
                <span className="text-gray-600 text-sm">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}

          {mode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {resetEmail && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Security Question</label>
                    <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                      {(() => {
                        const users = JSON.parse(localStorage.getItem('users') || '[]')
                        const user = users.find(u => u.email === resetEmail)
                        return user ? user.securityQuestion : 'Enter your email first'
                      })()}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Security Answer</label>
                    <input
                      type="text"
                      value={resetAnswer}
                      onChange={(e) => setResetAnswer(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your answer"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter new password"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium">
                Reset Password
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
 