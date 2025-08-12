import  { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Chat from './components/Chat'
import ChatHistory from './components/ChatHistory'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login onLogin={login} />} />
      <Route path="/dashboard" element={user ? <Dashboard user={user} onLogout={logout} /> : <Login onLogin={login} />} />
      <Route path="/profile" element={user ? <Profile user={user} onLogout={logout} /> : <Login onLogin={login} />} />
      <Route path="/chat" element={user ? <Chat user={user} onLogout={logout} /> : <Login onLogin={login} />} />
      <Route path="/chat-history" element={user ? <ChatHistory user={user} onLogout={logout} /> : <Login onLogin={login} />} />
    </Routes>
  )
}

export default App
 