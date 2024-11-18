import React, { useRef } from "react";
import { PlusCircle, Send } from "lucide-react";

const MessageInput = ({ message, setMessage, sendMessage, onFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onFileUpload({
          name: file.name,
          type: file.type,
          data: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-2 rounded-md">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
        />
        <button
          className="text-gray-400 hover:text-gray-300"
          onClick={() => fileInputRef.current?.click()}
        >
          <PlusCircle className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none text-sm"
        />
        <button
          onClick={sendMessage}
          className="text-gray-400 hover:text-gray-300"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
