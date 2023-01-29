import axios from 'axios';

import { Message } from '../interfaces/messageInterfaces';

class MessageController {
  url = `http://localhost:3333/message`;

  async getAllMessages() {
    return (await (axios.post(this.url, {}))).data;
  }

  async setNewMessage(message: Message) {
    return (await (axios.post(this.url, message))).data;
  }
}

export const messageController = new MessageController();