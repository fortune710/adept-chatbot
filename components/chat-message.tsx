import { MessageSquare, User } from 'lucide-react'

const ChatMessage = ({ isAi, content }: { isAi: boolean; content: string }) => (
  <div className={`flex ${isAi ? 'bg-gray-50' : ''} p-4 gap-4`}>
    <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${isAi ? 'bg-green-500' : 'bg-gray-500'}`}>
      {isAi ? (
        <MessageSquare className="w-5 h-5 text-white" />
      ) : (
        <User className="w-5 h-5 text-white" />
      )}
    </div>
    <div className="flex-1">
      <p className={`text-sm ${isAi ? 'text-gray-800' : 'text-gray-600'}`}>{content}</p>
    </div>
  </div>
)

export default ChatMessage;