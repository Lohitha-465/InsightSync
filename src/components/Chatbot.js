'use client';

import { useState, useRef, useEffect } from 'react';
import styles from '../styles/chatbot.module.scss'; // CSS Module import

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `**INSIGHTSYNC AI**\n\nGreat question! You can ask for my help with the following:\n\n1. Anything to do with your reports in our software (e.g. What is the last report we exported?)\n2. Anything to do with your organisation (e.g. how many employees are using our software?)\n3. Anything to do with the features we have in our software (e.g. how can I change the colours of my report?)`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (data?.response) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: "Sorry, I didn't understand that." }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'An error occurred. Please try again later.' },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleDefaultClick = (question) => {
    setInput(question);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <div className={styles.chatbot}>
      <div className={styles['chatbot-header']}>
        <h2>Ask our AI anything</h2>
      </div>

      {messages.length === 1 && (
        <div className={styles['chatbot-default-questions']}>
          <p onClick={() => handleDefaultClick("What is this?")}>1. What is this?</p>
          <p onClick={() => handleDefaultClick("How do I export reports?")}>2. How do I export reports?</p>
          <p onClick={() => handleDefaultClick("How many users are in my organisation?")}>3. How many users are in my organisation?</p>
        </div>
      )}

      <div className={styles['chatbot-messages']} ref={chatRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`${styles.message} ${styles[msg.role]}`}>
            <div
              className={styles['message-content']}
              dangerouslySetInnerHTML={{
                __html: msg.content
                  .replace(/\n/g, '<br/>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
              }}
            />
          </div>
        ))}
        {loading && <div className={`${styles.message} ${styles.assistant}`}>Thinking...</div>}
      </div>

      <div className={styles['chatbot-input']}>
        <input
          type="text"
          placeholder="Ask me anything about your reports..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}
