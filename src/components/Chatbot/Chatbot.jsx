import { useState, useEffect, useRef } from 'react'
import styles from './Chatbot.module.css'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_KEY,
  dangerouslyAllowBrowser: true
})

const SYSTEM_PROMPT = `You are a friendly assistant who specializes in movies.
Your main focus is helping users find and discover movies, but you can also answer general questions.
Keep answers short and friendly. If recommending movies, suggest 2-3 at most per response.
Always reply in the same language the user is writing in. If they write in Arabic, reply in Arabic. If they write in English, reply in English.
When a user mentions their mood or emotional state (e.g. sad, happy, stressed, bored, anxious, excited), recommend movies that suit that feeling. For example: sad → uplifting comedies or emotional dramas; happy → fun adventures or comedies; stressed → light-hearted comedies or feel-good movies; bored → thrilling action or mystery movies; anxious → calming or inspiring movies.`

const INITIAL_MESSAGE = { role: 'bot', text: 'Hi! 🎬 Tell me what kind of movie you are in the mood for!' }

const SUGGESTIONS = ['🎬 Action', '😂 Comedy', '😱 Horror', '💕 Romance']

const MOODS = ['😢 Sad', '😄 Happy', '😤 Bored', '😰 Stressed', '😠 Angry', '🥰 Romantic']

export default function Chatbot() {

  const [open, setOpen]         = useState(false)
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [listening, setListening] = useState(false)
  const bottomRef               = useRef(null)
  const recognitionRef          = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  function clearChat() {
    setMessages([INITIAL_MESSAGE])
  }

  async function sendMessage(text) {
    const messageText = text || input
    if (!messageText.trim() || loading) return

    const userMessage = { role: 'user', text: messageText }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const history = [...messages, userMessage]
        .filter((msg) => msg !== messages[0])
        .map((msg) => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.text
        }))

      const res = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history
        ]
      })

      const botReply = res.choices[0].message.content
      setMessages((prev) => [...prev, { role: 'bot', text: botReply }])
    } catch (err) {
      console.log('Error:', err)
      setMessages((prev) => [...prev, { role: 'bot', text: 'Something went wrong. Please try again!' }])
    }

    setLoading(false)
  }

  function handleKey(e) {
    if (e.key === 'Enter') sendMessage()
  }

  function toggleVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Voice search is not supported in your browser. Please use Chrome.')
      return
    }

    if (listening) {
      recognitionRef.current?.stop()
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'ar-EG,en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => setListening(true)

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      setInput(transcript)
      setListening(false)
    }

    recognition.onerror = () => setListening(false)
    recognition.onend   = () => setListening(false)

    recognitionRef.current = recognition
    recognition.start()
  }

  return (
    <div className={styles.wrapper}>

      {open && (
        <div className={styles.chatBox}>

          <div className={styles.header}>
            <span>🎬 Movie Assistant</span>
            <div className={styles.headerBtns}>
              <button onClick={clearChat} className={styles.clearBtn}>🗑</button>
              <button onClick={() => setOpen(false)} className={styles.closeBtn}>✕</button>
            </div>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? styles.userMsg : styles.botMsg}>
                {msg.text}
              </div>
            ))}

            {loading && <div className={styles.botMsg}>Thinking...</div>}

            {messages.length === 1 && !loading && (
              <div className={styles.suggestionsWrapper}>
                <div className={styles.suggestionsLabel}>🎬 Genre</div>
                <div className={styles.suggestions}>
                  {SUGGESTIONS.map((s) => (
                    <button key={s} className={styles.suggestionBtn} onClick={() => sendMessage(s)}>
                      {s}
                    </button>
                  ))}
                </div>
                <div className={styles.suggestionsLabel}>💭 How are you feeling?</div>
                <div className={styles.suggestions}>
                  {MOODS.map((m) => (
                    <button key={m} className={styles.moodBtn} onClick={() => sendMessage(`I'm feeling ${m.split(' ')[1].toLowerCase()}, recommend me a movie`)}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className={styles.inputRow}>
            <input
              type="text"
              placeholder="Ask me about movies..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              className={styles.input}
            />
            <button
              onClick={toggleVoice}
              className={`${styles.micBtn} ${listening ? styles.micActive : ''}`}
              title="Voice input"
            >
              🎤
            </button>
            <button onClick={() => sendMessage()} className={styles.sendBtn} disabled={loading}>➤</button>
          </div>

        </div>
      )}

      <button className={styles.floatBtn} onClick={() => setOpen(!open)}>
        🎬
      </button>

    </div>
  )
}
