import dayjs from 'dayjs';
import { useState } from "react";
import { Chatbot } from "supersimpledev";
import LoadingSpinner from '../assets/loading-spinner.gif';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {

    if (isLoading || inputText === '') {
      return;
    }

    setIsLoading(true);

    setInputText('');

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]
    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={LoadingSpinner} className="loading-spinner" />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    setIsLoading(false);
  }

  function handleKeyDown(event) {
    { (event.key === 'Enter') && (sendMessage()) }
    { (event.key === 'Escape') && (setInputText('')) }
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chat-input"
      />
      <button
        className="send-button"
        onClick={sendMessage}>
        Send
      </button>
    </div>
  );

}