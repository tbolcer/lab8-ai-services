import { ChatModel } from "./model.js";
import { ChatView } from "./view.js";
import { getElizaResponse } from "./botResponses.js";

export class ChatController {
  constructor(root) {
    this.model = new ChatModel();
    this.view = new ChatView(root);

    this.view.render(this.model.getAll());
    this.view.bindSend(text => this._sendUserMessage(text));

    this.model.addEventListener("change", () => this.view.render(this.model.getAll()));

    this.view.onEdit = id => this._editMessage(id);
    this.view.onDelete = id => this.model.delete(id);

    document.getElementById("clear-cache-btn")?.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear the chat history?")) {
        this.model.clear();
        localStorage.removeItem("chatHistory");
      }
    });

    document.getElementById("export-files-btn")?.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(this.model.getAll(), null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "chatHistory.json";
      a.click();
      URL.revokeObjectURL(a.href);
    });

    document.getElementById("import-files-btn")?.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.addEventListener("change", event => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
          try {
            const imported = JSON.parse(e.target.result);
            if (Array.isArray(imported)) {
              this.model.messages = imported;
              this.model._save();
              this.view.render(this.model.getAll());
              alert("Chat history imported successfully!");
            } else alert("Invalid JSON format.");
          } catch {
            alert("Failed to import JSON.");
          }
        };
        reader.readAsText(file);
      });
      input.click();
    });

    
    this.chatbotSelect = document.getElementById("chatbot-select");
    this.apiKey = null; 
  }

  async _sendUserMessage(text) {
    if (!text || !text.trim()) return;

    this.model.add({ text, sender: "user" });
    const typing = this.model.add({ text: "…", sender: "bot" });

    const mode = this.chatbotSelect?.value || "eliza";

    setTimeout(async () => {
      this.model.delete(typing.id);

      let reply = "";

      if (mode === "eliza") {
        reply = getElizaResponse(text);
      } else if (mode === "llm") {
        
        while (!this.apiKey) {
          const key = prompt("Enter your OpenAI API key:");
          if (!key) {
            this.model.add({ text: "No API key entered!", sender: "bot" });
            return;
          }
          this.apiKey = key.trim();
        }

        try {
          const res = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text, apiKey: this.apiKey })
          });

          if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Server returned ${res.status}: ${errText}`);
          }

          const data = await res.json();
          reply = data?.text || "No response from AI";

        } catch (err) {
          reply = `Error contacting AI: ${err.message}`;
          this.apiKey = null; 
        }
      }

      this.model.add({ text: reply, sender: "bot" });
    }, 700);
  }

  _editMessage(id) {
    const msg = this.model.getAll().find(m => m.id === id);
    if (!msg) return;
    const newText = prompt("Edit your message:", msg.text);
    if (newText && newText.trim()) {
      this.model.edit(id, newText.trim());
    }
  }
}
