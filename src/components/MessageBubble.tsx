interface MessageBubbleProps {
  text: string
  isUser: boolean
  timestamp?: string
}

export default function MessageBubble({ text, isUser, timestamp }: MessageBubbleProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm whitespace-pre-wrap ${
          isUser
            ? "bg-[#DCF8C6] text-gray-900 rounded-br-none"
            : "bg-white text-gray-900 rounded-bl-none"
        }`}
      >
        {text.split("\n").map((line, i) => (
          <span key={i}>
            {line.split(/(\*[^*]+\*)/).map((part, j) =>
              part.startsWith("*") && part.endsWith("*") ? (
                <strong key={j}>{part.slice(1, -1)}</strong>
              ) : (
                part
              )
            )}
            {i < text.split("\n").length - 1 && <br />}
          </span>
        ))}
        {timestamp && (
          <div className="text-[10px] text-gray-500 text-right mt-1">{timestamp}</div>
        )}
      </div>
    </div>
  )
}
