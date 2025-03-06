'use client'

import { useChat } from 'ai/react'
import { useState } from 'react'
import { SendIcon, UserIcon, AIIcon } from './Icons'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const sampleQuestions = [
  "What is the capital of France?",
  "How do I make pasta?",
  "Explain quantum computing"
]

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [showSuggestions, setShowSuggestions] = useState(true)

  const handleQuestionClick = (question: string) => {
    handleInputChange({ target: { value: question } } as any)
    setShowSuggestions(false)
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 && showSuggestions ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-semibold mb-8">What can I help with?</h1>
            <div className="flex flex-wrap gap-2 justify-center max-w-xl">
              {sampleQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleQuestionClick(question)}
                  className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto pt-4 pb-24">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-4 px-4 py-6 ${
                  message.role === 'assistant' ? 'bg-gray-50' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  {message.role === 'assistant' ? (
                    <AIIcon className="w-6 h-6 text-blue-600" />
                  ) : (
                    <UserIcon className="w-6 h-6 text-gray-600" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="font-medium">
                    {message.role === 'assistant' ? 'Maxxine' : 'You'}
                  </div>
                  <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-gray-100">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4">
          <div className="relative">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Health Maxx with Maxxine..."
              className="w-full p-4 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 shadow-sm"
            />
            <button
              type="submit"
              disabled={isLoading || !input}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 disabled:hover:text-gray-400"
            >
              <SendIcon className={`w-5 h-5 ${isLoading ? 'animate-pulse' : ''}`} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 