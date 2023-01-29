import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import './messages.css'
import { messageController } from '../../controllers/messageController';

export const MessageBoard = () => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [messages, setMessages] = useState('');

  useEffect(() => {
    (async () => {
      setMessages(await messageController.getAllMessages());
    })();
  }, [messages]);

  const handleAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target?.value);
  }

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target?.value);
  }

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessages(await messageController.setNewMessage({author, text}));
    setAuthor('');
    setText('');
  }

  return(
    <section className="screen">
      <button className="form padding digits"><Link to="/digits">Средние числа</Link></button>
      <form className="string" onSubmit={handleSubmit}>
        <input type="text" placeholder="Автор" className="author form padding" value={author} onChange={handleAuthor} />
        <input type="text" placeholder="Текст сообщения" className="message form padding" value={text} onChange={handleText} />
        <button className="form padding">Разместить сообщение</button>
      </form>
      <div>{parse(messages)}</div>
    </section>
  );
}