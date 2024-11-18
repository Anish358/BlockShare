import React from "react";

const Sidebar = ({
  recipientAddress,
  setRecipientAddress,
  recipientName,
  setRecipientName,
  createChat,
  chats,
  selectedChat,
  setSelectedChat,
}) => {
  return (
    <div className="w-72 border-r border-gray-800">
      <div className="p-4">
        <h2 className="text-xl text-white mb-4">Chats</h2>

        {/* Chat creation inputs */}
        <div className="space-y-2 mb-4">
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="w-full px-3 py-2 bg-[#2a2a2a] text-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500 text-sm"
          />
          <input
            type="text"
            placeholder="Recipient Name"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="w-full px-3 py-2 bg-[#2a2a2a] text-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500 text-sm"
          />
          <button
            onClick={createChat}
            className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm"
          >
            Create Chat
          </button>
        </div>

        {/* Chat list */}
        <div className="space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-3 rounded-md cursor-pointer ${
                selectedChat?.id === chat.id
                  ? "bg-[#2a2a2a]"
                  : "hover:bg-[#252525]"
              }`}
            >
              <p className="text-white text-sm font-medium">
                {chat.recipientName}
              </p>
              <p className="text-gray-400 text-xs truncate">
                {chat.recipientAddress}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
