# lab8-AI-Services
COMP 305 Fall 2025 Lab 8 AI Services

This project implements a simple chat application using a **Model-View-Controller (MVC)** architecture with **web components**. It allows users to send messages, receive bot replies, edit or delete messages, and manage chat history through import/export functionality.

## 🧩 Features
* **User and Bot Messaging**: Users can send messages; the bot responds automatically.
* **Edit/Delete Messages**: Users can edit or delete their own messages.
* **Typing Indicator**: Bot shows a “…” **typing indicator** before sending replies.
* **Persistent Storage**: Chat history is saved in **localStorage**.
* **Import/Export Chat**: Easily import or export chat history as **JSON files**.
* **Clear Chat**: Reset the chat interface and local storage.
* **Bot Avatar**: Displays **robIcon.png** next to bot messages.
* **Responsive Design**: Styled with CSS to work on various screen sizes.

---

## 📂 Project Structure

/src<br>
├─ index.html<br>
├─ styles.css<br>
├─ img/<br>
│ └─ robIcon.png<br>
├─ js/<br>
│ ├─ app.js<br>
│ ├─ controller.js<br>
│ ├─ model.js<br>
│ ├─ view.js<br>
│ └─ eliza.js<br>
        

---

## ⚙️ Installation & Usage
1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/tbolcer/lab7-ai-services](https://github.com/tbolcer/lab7-ai-services.git)
    cd lab8-ai-services
    ```
2.  Open **index.html** in a modern browser (Chrome, Edge, Firefox).
3.  Start chatting with the bot!

---

## 📝 How to Use
* **Send a Message**: Type your message in the input box and hit **Send**.
* **Edit/Delete a Message**: Hover over your message and click **✎** to edit or **🗑** to delete.
* **Clear Chat**: Click **Clear Chat** to remove all messages from UI and localStorage.
* **Import Chat**: Click **Import Chat** and select a `.json` file to restore messages.
* **Export Chat**: Click **Export Chat** to download your chat history as a `.json` file.
* **Bot Avatar**: `robIcon.png` is shown next to bot messages for visual distinction.

---

## 🎨 Styling
* **User messages**: **Blue bubbles** on the right.
* **Bot messages**: **Gray bubbles** on the left with avatar icon.
* **Edit/Delete buttons**: Appear on **hover** for user messages.
* **Header**: Includes chat title and **Import/Clear/Export buttons**.
* **Responsive layout**: Buttons and messages adjust for different screen sizes.

---

## 🛠️ Technologies Used
* **HTML5**: Structure and semantic elements.
* **CSS3**: Flexbox layout, gradients, shadows, and hover effects.
* **JavaScript (ES6 Modules)**: MVC architecture, event handling, `localStorage`, file import/export.
* **Web Components**: Custom `<simple-chat>` and `<chat-header>` elements.

---

## 📈 MVC Overview
* **Model (`model.js`)**: Stores messages, handles add/edit/delete/clear, persists in `localStorage`.
* **View (`view.js`)**: Renders messages, input form, buttons, and updates the DOM.
* **Controller (`controller.js`)**: Connects the model and view, handles user actions, bot responses, and file operations.

---

## 📂 Import / Export JSON Format
JSON file is an array of message objects:

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