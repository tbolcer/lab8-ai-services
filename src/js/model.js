// model.js
export class ChatModel extends EventTarget {
    constructor(storageKey = "chatHistory") {
        super();
        this.storageKey = storageKey;
        this.messages = this._load();
    }

    _load() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    }

    _save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.messages));
        this.dispatchEvent(new Event("change"));
    }

    getAll() {
        return [...this.messages];
    }

    add({ text, sender }) {
        const msg = {
            id: crypto.randomUUID(),
            text,
            sender,
            timestamp: Date.now(),
            edited: false,
        };
        this.messages.push(msg);
        this._save();
        return msg;
    }

    edit(id, newText) {
        const msg = this.messages.find(m => m.id === id);
        if (msg && msg.sender === "user") {
            msg.text = newText;
            msg.edited = true;
            this._save();
        }
    }

    delete(id) {
        this.messages = this.messages.filter(m => m.id !== id);
        this._save();
    }

    clear() {
        if (confirm("Clear chat history?")) {
            this.messages = [];
            this._save();
        }
    }
}
