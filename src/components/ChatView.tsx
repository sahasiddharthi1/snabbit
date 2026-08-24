import { useState, useRef, useEffect } from "react"
import { createSession, handleUserInput } from "../lib/engine"
import type { Session, BotTurn } from "../lib/types"
import WhatsAppIcon from "./WhatsAppIcon"
import MessageBubble from "./MessageBubble"
import PaymentSheet from "./PaymentSheet"

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: string
}

function now() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })
}

export default function ChatView() {
  const [messages, setMessages] = useState<Message[]>([])
  const [session, setSession] = useState<Session>(() => createSession())
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [pendingTurn, setPendingTurn] = useState<BotTurn | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)

  useEffect(() => {
    const greeting = handleUserInput(session, "")
    addBotMessage(greeting.turn.text)
    setSession(greeting.session)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  function addUserMessage(text: string) {
    idRef.current++
    setMessages((prev) => [...prev, { id: idRef.current, text, isUser: true, timestamp: now() }])
  }

  function addBotMessage(text: string) {
    idRef.current++
    setMessages((prev) => [...prev, { id: idRef.current, text, isUser: false, timestamp: now() }])
  }

  function handleSend() {
    const text = input.trim()
    if (!text) return
    setInput("")
    addUserMessage(text)

    setIsTyping(true)
    setTimeout(() => {
      const { turn, session: newSession } = handleUserInput(session, text)
      setIsTyping(false)
      setSession(newSession)

      if (turn.tracking) {
        addBotMessage(turn.text)
        setPendingTurn(turn)
        setShowPayment(true)
      } else {
        addBotMessage(turn.text)
      }
    }, 600 + Math.random() * 400)
  }

  function handlePay() {
    setShowPayment(false)
    if (pendingTurn) {
      setIsTyping(true)
      setTimeout(() => {
        const { turn, session: newSession } = handleUserInput(session, "yes")
        setIsTyping(false)
        setSession(newSession)
        addBotMessage(turn.text)
        setPendingTurn(null)
      }, 800)
    }
  }

  function handleButtonClick(label: string) {
    addUserMessage(label)
    setIsTyping(true)
    setTimeout(() => {
      const { turn, session: newSession } = handleUserInput(session, label)
      setIsTyping(false)
      setSession(newSession)

      if (turn.tracking) {
        addBotMessage(turn.text)
        setPendingTurn(turn)
        setShowPayment(true)
      } else {
        addBotMessage(turn.text)
      }
    }, 600 + Math.random() * 400)
  }

  const lastBotMsg = [...messages].reverse().find((m) => !m.isUser)
  const lastTurn = handleUserInput(session, "")
  const buttons = messages.length <= 1 ? [] : (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (!messages[i].isUser) {
        const result = handleUserInput(session, "dummyButtons")
        return []
      }
    }
    return []
  })()

  return (
    <div className="flex flex-col h-screen bg-[#ECE5DD]">
      {showPayment && (
        <PaymentSheet amount={session.total ?? 0} onPay={handlePay} onClose={() => setShowPayment(false)} />
      )}

      <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3 shadow-md">
        <WhatsAppIcon className="w-7 h-7" />
        <div>
          <h1 className="font-semibold text-base leading-tight">Snabbit</h1>
          <p className="text-[11px] text-green-200">Home Services via WhatsApp</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} text={msg.text} isUser={msg.isUser} timestamp={msg.timestamp} />
        ))}

        {isTyping && (
          <div className="flex justify-start mb-2">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm rounded-bl-none">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="bg-[#F0F0F0] border-t border-gray-200 px-3 py-2">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-white rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#25D366]/40"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-[#25D366] hover:bg-[#20ba5a] disabled:opacity-40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
