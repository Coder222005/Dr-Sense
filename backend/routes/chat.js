import  express from 'express'
import db from '../database/db.js'
import { authenticateToken } from '../middleware/auth.js'
import multer from 'multer'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

// Dummy LLM API
const dummyLLMResponse = async (message) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return `This is a dummy AI response to: "${message}". In a real implementation, this would connect to an actual LLM API.`
}

// Dummy OCR API
const dummyOCRResponse = async (imagePath) => {
  await new Promise(resolve => setTimeout(resolve, 1500))
  return "Dummy OCR result: This prescription contains medication details that would be extracted by a real OCR service."
}

router.get('/threads', authenticateToken, (req, res) => {
  db.all('SELECT * FROM chat_threads WHERE user_id = ? ORDER BY created_at DESC', [req.user.id], (err, threads) => {
    if (err) return res.status(500).json({ error: 'Database error' })
    res.json(threads)
  })
})

router.post('/threads', authenticateToken, (req, res) => {
  const { title } = req.body
  
  db.run('INSERT INTO chat_threads (user_id, title) VALUES (?, ?)', [req.user.id, title], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' })
    res.json({ id: this.lastID, title })
  })
})

router.get('/threads/:threadId/messages', authenticateToken, (req, res) => {
  db.all('SELECT * FROM messages WHERE thread_id = ? ORDER BY created_at', [req.params.threadId], (err, messages) => {
    if (err) return res.status(500).json({ error: 'Database error' })
    res.json(messages)
  })
})

router.post('/threads/:threadId/messages', authenticateToken, async (req, res) => {
  const { content, type } = req.body
  const threadId = req.params.threadId
  
  // Save user message
  db.run('INSERT INTO messages (thread_id, type, content) VALUES (?, ?, ?)', [threadId, 'user', content], async function(err) {
    if (err) return res.status(500).json({ error: 'Database error' })
    
    // Generate AI response
    const aiResponse = await dummyLLMResponse(content)
    
    // Save AI response
    db.run('INSERT INTO messages (thread_id, type, content) VALUES (?, ?, ?)', [threadId, 'bot', aiResponse], (err) => {
      if (err) return res.status(500).json({ error: 'Database error' })
      res.json({ userMessage: { id: this.lastID, content }, aiResponse })
    })
  })
})

router.post('/ocr', authenticateToken, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image provided' })
  
  try {
    const ocrResult = await dummyOCRResponse(req.file.path)
    res.json({ text: ocrResult })
  } catch (error) {
    res.status(500).json({ error: 'OCR processing failed' })
  }
})

router.delete('/threads/:threadId', authenticateToken, (req, res) => {
  db.run('DELETE FROM chat_threads WHERE id = ? AND user_id = ?', [req.params.threadId, req.user.id], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' })
    res.json({ message: 'Thread deleted successfully' })
  })
})

export default router
 