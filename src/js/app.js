 import { ChatController } from './controller.js';
    window.addEventListener('DOMContentLoaded', () => {
      const chatRoot = document.querySelector('simple-chat');
      new ChatController(chatRoot);
    });