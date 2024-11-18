import React from "react";
import { File, Image } from "lucide-react";

const MessageList = ({ messages, userAddress }) => {
  const renderMessageContent = (msg) => {
    if (msg.isFile) {
      const isImage = msg.fileType?.startsWith("image/");

      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {isImage ? (
              <Image className="w-4 h-4" />
            ) : (
              <File className="w-4 h-4" />
            )}
            <span>{msg.fileName}</span>
          </div>
          {isImage && (
            <img
              src={msg.content}
              alt={msg.fileName}
              className="max-w-[200px] rounded-md"
            />
          )}
          <a
            href={msg.content}
            download={msg.fileName}
            className="text-xs text-blue-300 hover:text-blue-400"
          >
            Download
          </a>
        </div>
      );
    }
    return <p className="text-sm">{msg.content}</p>;
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === userAddress ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-2 rounded-md ${
                msg.sender === userAddress
                  ? "bg-blue-500 text-white"
                  : "bg-[#2a2a2a] text-gray-200"
              }`}
            >
              {renderMessageContent(msg)}
              <p className="text-xs mt-1 opacity-70">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
