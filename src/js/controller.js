// controller.js
import { ChatModel } from "./model.js";
import { ChatView } from "./view.js";
import { getBotResponse } from "./eliza.js";

export class ChatController {
    constructor(root) {
        this.model = new ChatModel();
        this.view = new ChatView(root);

        this.view.render(this.model.getAll());

        this.view.bindSend(text => this._sendUserMessage(text));

        this.model.addEventListener("change", () => {
            this.view.render(this.model.getAll());
        });

        this.view.onEdit = id => this._editMessage(id);
        this.view.onDelete = id => this.model.delete(id);

        const clearBtn = document.getElementById("clear-cache-btn");
        if (clearBtn) {
            clearBtn.addEventListener("click", () => {
                if (confirm("Are you sure you want to clear the chat history?")) {
                    this.model.clear();
                    localStorage.removeItem("chatHistory");
                }
            });
        }

        const exportBtn = document.getElementById("export-files-btn");
        if (exportBtn) {
            exportBtn.addEventListener("click", () => {
                const messages = this.model.getAll();

                const json = JSON.stringify(messages, null, 2);

                const blob = new Blob([json], { type: "application/json" });

                const url = URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = "chatHistory.json";
                a.click();

                URL.revokeObjectURL(url);
            });
        }


        const importBtn = document.getElementById("import-files-btn");
        if (importBtn) {
            importBtn.addEventListener("click", () => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = ".json";
                input.addEventListener("change", event => {
                    const file = event.target.files[0];
                    if (!file) return;

                    const reader = new FileReader();
                    reader.onload = e => {
                        try {
                            const importedMessages = JSON.parse(e.target.result);

                            if (Array.isArray(importedMessages)) {
                                this.model.messages = importedMessages;
                                this.model._save();
                                this.view.render(this.model.getAll());
                                alert("Chat history imported successfully!");
                            } else {
                                alert("Invalid file format. JSON must be an array of messages.");
                            }
                        } catch (err) {
                            alert("Failed to import file. Make sure it is valid JSON.");
                        }
                    };
                    reader.readAsText(file);
                });

                input.click();
            });
        }


    }

    _sendUserMessage(text) {
        this.model.add({ text, sender: "user" });

        const typing = this.model.add({ text: "…", sender: "bot" });

        setTimeout(() => {
            this.model.delete(typing.id);
            const reply = getBotResponse(text);
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
