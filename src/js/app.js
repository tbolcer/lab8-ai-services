import { ChatController } from './controller.js';

window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem("OPENAI_KEY")) {
    const key = prompt("Enter your OpenAI API Key (for LLM mode):");
    if (key && key.trim()) {
      localStorage.setItem("OPENAI_KEY", key.trim());
    }
  }

  const chatRoot = document.querySelector('simple-chat');
  new ChatController(chatRoot);
});
