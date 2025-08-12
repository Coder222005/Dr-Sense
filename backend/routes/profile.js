import  express from 'express'
import db from '../database/db.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/', authenticateToken, (req, res) => {
  db.get('SELECT * FROM profiles WHERE user_id = ?', [req.user.id], (err, profile) => {
    if (err) return res.status(500).json({ error: 'Database error' })
    res.json(profile || {})
  })
})

router.post('/', authenticateToken, (req, res) => {
  const { age, gender, phone, address, bloodType, allergies, medications, medicalHistory, emergencyContact } = req.body
  
  db.run(
    `INSERT OR REPLACE INTO profiles 
     (user_id, age, gender, phone, address, blood_type, allergies, medications, medical_history, emergency_contact) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [req.user.id, age, gender, phone, address, bloodType, allergies, medications, medicalHistory, emergencyContact],
    (err) => {
      if (err) return res.status(500).json({ error: 'Database error' })
      res.json({ message: 'Profile updated successfully' })
    }
  )
})

export default router
 