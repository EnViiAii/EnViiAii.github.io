import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext.js";
import "./HomePage.css";

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user_query, setUser_query] = useState("");
  const [bot, setBot] = useState("");
  const { user } = useContext(AuthContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/chatbot", {
        params: {
          username: user,
        },
      })
      .then((response) => {
        const chatData = response.data.foundChat;
        const newMessages = [];

        chatData.forEach((item) => {
          newMessages.push({ text: item.user_query, sender: "user" });
          newMessages.push({ text: item.bot_response });
        });

        setMessages(newMessages);
        scrollToBottom();
      })
      .catch((error) => {
        console.error("Error while fetching chatbot data:", error);
      });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (event) => {
    if (event.key === "Enter" || event.type === "click") {
      if (newMessage.trim() !== "") {
        const newMessages = [];
        newMessages.push({ text: newMessage, sender: "user" });
        setUser_query(newMessage);
        setNewMessage("");

        let bot_response;

        try {
          const response = await axios.get("http://127.0.0.1:5000", {
            params: {
              message: newMessage,
            },
          });

          bot_response = response.data.bot_response;
          newMessages.push({ text: bot_response });
        } catch (error) {
          console.error("Error sending message:", error);
        }
        setMessages([...messages, ...newMessages]);

        try {
          await axios.post("http://localhost:8080/chatbot", {
            user_query: newMessage,
            bot_response: bot_response,
            username: user,
          });
        } catch (error) {
          console.error("Error saving messages to the server:", error);
        }
      }
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="input-box">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyUp={handleSendMessage}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default HomePage;
