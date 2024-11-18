import React from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

const ChatArea = ({
  selectedChat,
  messages,
  userAddress,
  message,
  setMessage,
  sendMessage,
  handleFileUpload,
}) => {
  return (
    <div className="flex-1 flex flex-col">
      {selectedChat ? (
        <>
          <MessageList messages={messages} userAddress={userAddress} />
          <MessageInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            onFileUpload={handleFileUpload}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
};

export default ChatArea;
