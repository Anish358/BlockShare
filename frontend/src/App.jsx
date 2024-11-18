import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import "./App.css";

const App = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [walletConnected, setWalletConnected] = useState(false); // Changed to false by default
  const [userAddress, setUserAddress] = useState("");
  const [error, setError] = useState("");

  // Check if wallet is already connected on component mount
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const handleFileUpload = (file) => {
    if (!selectedChat) return;

    const newMessage = {
      id: Date.now(),
      content: file.data,
      fileName: file.name,
      fileType: file.type,
      sender: userAddress,
      timestamp: new Date().toISOString(),
      isFile: true,
    };

    const updatedChats = chats.map((chat) => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          messages: [...(chat.messages || []), newMessage],
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setMessages([...messages, newMessage]);
  };

  // Function to check if wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) {
        setError("Please install MetaMask!");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setUserAddress(accounts[0]);
        setWalletConnected(true);
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
      setError("Error connecting to wallet");
    }
  };

  // Function to connect wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError("Please install MetaMask!");
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setUserAddress(accounts[0]);
      setWalletConnected(true);
      setError("");

      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setUserAddress(accounts[0]);
        } else {
          setWalletConnected(false);
          setUserAddress("");
        }
      });

      // Listen for chain changes
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setError("Error connecting to wallet");
    }
  };

  const createChat = () => {
    if (!recipientAddress || !recipientName) {
      setError("Please fill in both recipient address and name");
      return;
    }

    const newChat = {
      id: `${Date.now()}`,
      recipientAddress,
      recipientName,
      messages: [],
    };

    setChats([...chats, newChat]);
    setRecipientAddress("");
    setRecipientName("");
    setError("");
  };

  const sendMessage = () => {
    if (!message || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      content: message,
      sender: userAddress,
      timestamp: new Date().toISOString(),
      isFile: false,
    };

    const updatedChats = chats.map((chat) => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          messages: [...(chat.messages || []), newMessage],
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setMessage("");

    if (selectedChat) {
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      const chat = chats.find((c) => c.id === selectedChat.id);
      setMessages(chat?.messages || []);
    }
  }, [selectedChat, chats]);

  // Show wallet connection screen if not connected
  if (!walletConnected) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-6">
            Welcome to Secure Chat
          </h1>
          <button
            onClick={connectWallet}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Connect Wallet
          </button>
          {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black">
      <Sidebar
        recipientAddress={recipientAddress}
        setRecipientAddress={setRecipientAddress}
        recipientName={recipientName}
        setRecipientName={setRecipientName}
        createChat={createChat}
        chats={chats}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        userAddress={userAddress}
      />
      <ChatArea
        selectedChat={selectedChat}
        messages={messages}
        userAddress={userAddress}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        handleFileUpload={handleFileUpload}
      />
      {error && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default App;
