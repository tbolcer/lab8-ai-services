// view.js
export class ChatView {
    constructor(root) {
        this.root = root;
        this.messagesEl = root.querySelector(".messages");
        this.form = root.querySelector("form.input-area");
        this.input = this.form.querySelector("input[type='text']");
        this.button = this.form.querySelector("button[type='submit']");
    }

    render(messages) {
        this.messagesEl.innerHTML = "";
        for (const msg of messages) this.addMessage(msg);
        this.scrollToBottom();
    }

    addMessage(msg) {
        const messageEl = document.createElement("div");
        messageEl.className = `message ${msg.sender}`;
        messageEl.dataset.id = msg.id;

        const bubble = document.createElement("div");
        bubble.className = "bubble";

        const textSpan = document.createElement("span");
        textSpan.textContent = msg.text;
        bubble.appendChild(textSpan);

        if (msg.edited) {
            const editedTag = document.createElement("small");
            editedTag.textContent = " (edited)";
            bubble.appendChild(editedTag);
        }

        if (msg.sender === "user") {
            const buttonContainer = document.createElement("span");
            buttonContainer.className = "bubble-buttons";

            const editBtn = document.createElement("button");
            editBtn.textContent = "✎";
            editBtn.className = "edit-btn";
            editBtn.addEventListener("click", () => this.onEdit && this.onEdit(msg.id));

            const delBtn = document.createElement("button");
            delBtn.textContent = "🗑";
            delBtn.className = "delete-btn";
            delBtn.addEventListener("click", () => this.onDelete && this.onDelete(msg.id));

            buttonContainer.append(editBtn, delBtn);
            bubble.appendChild(buttonContainer);
        }

        messageEl.appendChild(bubble);
        this.messagesEl.appendChild(messageEl);
        this.scrollToBottom();
    }


    updateMessage(id, newText) {
        const bubble = this.messagesEl.querySelector(`[data-id="${id}"] .bubble`);
        if (bubble) bubble.textContent = newText + " (edited)";
    }

    deleteMessage(id) {
        const el = this.messagesEl.querySelector(`[data-id="${id}"]`);
        if (el) el.remove();
    }

    scrollToBottom() {
        this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
    }

    bindSend(handler) {
        this.form.addEventListener("submit", e => {
            e.preventDefault();
            const text = this.input.value.trim();
            if (!text) return;
            handler(text);
            this.input.value = "";
        });
    }
}
