// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SecureChat {
    struct Message {
        address sender;
        string contentHash; // IPFS hash of encrypted message content
        uint256 timestamp;
        bool isFile;
    }

    struct Chat {
        string chatId;
        address user1;
        address user2;
        string user2Name;
        bool exists;
    }

    mapping(string => Chat) public chats;
    mapping(address => string[]) public userChats;

    event ChatCreated(
        string chatId,
        address user1,
        address user2,
        string user2Name
    );
    event MessageSent(
        string chatId,
        address sender,
        string contentHash,
        bool isFile
    );

    function createChat(
        address _recipient,
        string memory _recipientName
    ) public returns (string memory) {
        string memory chatId = generateChatId(msg.sender, _recipient);
        require(!chats[chatId].exists, "Chat already exists");

        chats[chatId] = Chat(
            chatId,
            msg.sender,
            _recipient,
            _recipientName,
            true
        );
        userChats[msg.sender].push(chatId);
        userChats[_recipient].push(chatId);

        emit ChatCreated(chatId, msg.sender, _recipient, _recipientName);
        return chatId;
    }

    function sendMessage(
        string memory _chatId,
        string memory _contentHash,
        bool _isFile
    ) public {
        require(chats[_chatId].exists, "Chat does not exist");
        require(
            msg.sender == chats[_chatId].user1 ||
                msg.sender == chats[_chatId].user2,
            "Not authorized"
        );

        emit MessageSent(_chatId, msg.sender, _contentHash, _isFile);
    }

    function getUserChats(address _user) public view returns (string[] memory) {
        return userChats[_user];
    }

    function getChatDetails(
        string memory _chatId
    ) public view returns (Chat memory) {
        require(chats[_chatId].exists, "Chat does not exist");
        return chats[_chatId];
    }

    function generateChatId(
        address _user1,
        address _user2
    ) internal pure returns (string memory) {
        if (_user1 < _user2) {
            return string(abi.encodePacked(_user1, _user2));
        }
        return string(abi.encodePacked(_user2, _user1));
    }
}
