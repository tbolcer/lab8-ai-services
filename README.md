# lab8-AI-Services
COMP 305 Fall 2025 Lab 8 AI Services

This project extends the **simple chat application** from Lab 7 with **AI integration**. Users can chat with either an **Eliza-style bot** or an **AI chatbot (ChatGPT)** via a proxy server. The application continues to use a **Model-View-Controller (MVC)** architecture with **web components**.

---

## 🧩 Features
* **User and Bot Messaging**: Users send messages; the bot responds automatically.
* **Dual Bot Modes**: Switch between:
  - **Eliza**: Classic pattern-based responses.
  - **AI ChatGPT**: Responses from OpenAI via a secure proxy.
* **Edit/Delete Messages**: Users can edit or delete their own messages.
* **Typing Indicator**: Shows "…" while the bot is generating a response.
* **Persistent Storage**: Chat history saved in **localStorage**.
* **Import/Export Chat**: Import or export chat history as **JSON files**.
* **Clear Chat**: Reset the interface and local storage.
* **Bot Avatar**: Displays **robIcon.png** next to bot messages.
* **Responsive Design**: Styled with CSS to work across screen sizes.
* **API Key Management**: Users are prompted to enter their OpenAI API key (stored in memory) to use AI ChatGPT mode.

---

## 📂 Project Structure

/src
├─ index.html
├─ styles.css
├─ img/
│ └─ robIcon.png
├─ js/
│ ├─ app.js
│ ├─ controller.js
│ ├─ model.js
│ ├─ view.js
│ ├─ botResponses.js
│ └─ eliza.js
├─ server.js (Node.js proxy for AI requests)

---

## ⚙️ Installation & Usage
1. **Clone the repository**:
    ```bash
    git clone [https://github.com/tbolcer/lab8-ai-services.git]
    cd lab8-ai-services
    ```
2. **Install dependencies for server**:
    ```bash
    npm install
    ```
3. **Start the proxy server** (for AI ChatGPT mode):
    ```bash
    node server.js
    ```
4. **Open `index.html`** in a modern browser (Chrome, Edge, Firefox).
5. **Chat!** Switch between **Eliza** and **AI ChatGPT** using the dropdown in the header.

---

## 📝 How to Use
* **Send a Message**: Type in the input box and hit **Send**.
* **Edit/Delete a Message**: Hover over a user message; click **✎** to edit or **🗑** to delete.
* **Switch Bot Mode**: Select **Eliza** or **AI ChatGPT** from the dropdown menu.
* **API Key Prompt**: If AI ChatGPT is selected, you will be prompted for your **OpenAI API key**.
* **Clear Chat**: Click **Clear Chat** to remove all messages and clear `localStorage`.
* **Import Chat**: Click **Import Chat** and select a `.json` file.
* **Export Chat**: Click **Export Chat** to download chat history as `.json`.
* **Bot Avatar**: `robIcon.png` is displayed next to bot messages.

---

## 🎨 Styling
* **User messages**: Blue bubbles on the right.
* **Bot messages**: Gray bubbles on the left with avatar.
* **Edit/Delete buttons**: Appear on hover for user messages.
* **Header**: Includes chat title, mode dropdown, Import/Clear/Export buttons.
* **Responsive layout**: Buttons and messages adjust for different screen sizes.
* **Full-page gradient** background with padding below chat window.

---

## 🛠️ Technologies Used
* **HTML5**: Structure and semantic elements.
* **CSS3**: Flexbox, gradients, shadows, hover effects, responsive design.
* **JavaScript (ES6 Modules)**: MVC architecture, event handling, `localStorage`, file import/export.
* **Web Components**: `<simple-chat>` and `<chat-header>`.
* **Node.js / Express**: Proxy server for OpenAI API requests.
* **Fetch API**: Communicates with the proxy server.

---

## 📈 MVC Overview
* **Model (`model.js`)**: Stores messages, add/edit/delete/clear, persists in `localStorage`.
* **View (`view.js`)**: Renders messages, input form, buttons, updates DOM.
* **Controller (`controller.js`)**: Connects model and view, handles user actions, mode selection, and bot responses (Eliza or AI).
* **Bot Responses (`botResponses.js` & `eliza.js`)**: Contains Eliza pattern matching and fallback responses.

---

## 📂 Import / Export JSON Format
JSON files remain arrays of message objects:

```json
[
  {
    "id": "uuid",
    "text": "Hello!",
    "sender": "user",
    "timestamp": 1690000000000,
    "edited": false
  },
  {
    "id": "uuid",
    "text": "Hi there!",
    "sender": "bot",
    "timestamp": 1690000001000,
    "edited": false
  }
]

