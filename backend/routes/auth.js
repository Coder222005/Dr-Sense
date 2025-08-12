import  express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../database/db.js'

const router = express.Router()
const JWT_SECRET = 'dr-sense-secret-key'

router.post('/login', (req, res) => {
  const { email, password } = req.body
  
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' })
    
    const token = jwt.sign({ id: user.id }, JWT_SECRET)
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name 
      } 
    })
  })
})

router.post('/register', async (req, res) => {
  const { email, password, name, securityQuestion, securityAnswer } = req.body
  
  const hashedPassword = await bcrypt.hash(password, 10)
  
  db.run(
    'INSERT INTO users (email, password, name, security_question, security_answer) VALUES (?, ?, ?, ?, ?)',
    [email, hashedPassword, name, securityQuestion, securityAnswer],
    function(err) {
      if (err) return res.status(400).json({ error: 'Email already exists' })
      res.json({ message: 'User created successfully' })
    }
  )
})

router.post('/forgot-password', (req, res) => {
  const { email, securityAnswer, newPassword } = req.body
  
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' })
    if (!user) return res.status(404).json({ error: 'Email not found' })
    if (user.security_answer !== securityAnswer) {
      return res.status(401).json({ error: 'Incorrect security answer' })
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    db.run('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user.id], (err) => {
      if (err) return res.status(500).json({ error: 'Database error' })
      res.json({ message: 'Password updated successfully' })
    })
  })
})

export default router
 