export const elizaPatterns = [
  {
    pattern: /hello|hi|hey|howdy/i,
    responses: [
      "Hello! How are you doing today?",
      "Hi there! What's on your mind?",
      "Hey! How can I help you?",
      "Howdy! What would you like to talk about?"
    ]
  },
  {
    pattern: /how are you/i,
    responses: [
      "I'm just a program, but I'm functioning well! How are you?",
      "I'm doing great! Thanks for asking. How about you?",
      "I'm here and ready to chat! How are you feeling?"
    ]
  },
  {
    pattern: /help|what can you do/i,
    responses: [
      "I'm a simple chatbot built with Eliza-style pattern matching. Try asking me questions!",
      "I can have a basic conversation with you. Ask me anything!",
      "I use pattern matching to respond to your messages."
    ]
  },
  {
    pattern: /your name|who are you/i,
    responses: [
      "I'm a simple chat assistant, built to demonstrate component-based thinking!",
      "I'm a chatbot created for educational purposes. Nice to meet you!",
      "You can call me ChatBot. I'm here to demonstrate web component approaches."
    ]
  },
  
];

export const elizaDefault = [
  "Tell me more about that.",
  "I see. Can you elaborate?",
  "That's interesting. What else?",
  "Go on, I'm listening.",
  "How does that make you feel?",
  "Can you explain that a bit more?"
];

export function getElizaResponse(message) {
  for (let i = 0; i < elizaPatterns.length; i++) {
    const match = message.match(elizaPatterns[i].pattern);
    if (match) {
      let response = elizaPatterns[i].responses[Math.floor(Math.random() * elizaPatterns[i].responses.length)];
      if (match.length > 1) {
        for (let j = 1; j < match.length; j++) {
          response = response.replace("$" + j, match[j]);
        }
      }
      return response;
    }
  }
  return elizaDefault[Math.floor(Math.random() * elizaDefault.length)];
}
