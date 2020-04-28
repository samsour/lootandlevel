import { initChat } from 'console-chat-client';

class ChatUI {
    constructor({ apiUrl, selector, username, password }) {
        initChat({ apiUrl });

        console.login(username, password);

        this.username = username;
        this.selector = document.querySelector(selector);
        this.submit = this.selector.querySelector('.js-chat-submit');
        this.input = this.selector.querySelector('.js-chat-input');
        this.messages = this.selector.querySelector('.js-chat-messages');

        this.chatRoom = null;

        this.initEventListeners();
    }

    initEventListeners() {
        window.addEventListener('receiveMessages', this.receiveMessages.bind(this));

        this.submit.addEventListener("click", this.submitMessage.bind(this));
        this.input.addEventListener("focus", () => {
            if (this.chatRoom === null) {
                console.join(1);
            }
        })
        document.addEventListener("keydown", event => {
            if (event.keyCode === 13) {
                if(event.srcElement !== this.input) {
                    this.input.focus();
                } else {
                    event.preventDefault();
                    this.submitMessage();
                }
            }
          });
    }

    submitMessage() {
        if (this.input.value.length > 0) {
            const message = {
                message: this.input.value,
                user: {
                    username: this.username
                },
                created_at: Date.now()
            }
            
            console.chat(message.message);
            this.printMessage(this.buildChatMessage(message));
            this.input.value = "";
            this.input.blur();
        }
    }

    receiveMessages(event) {
        const messages = event.detail.messages;
        if (messages.length > 0) {
            messages.forEach(message => {
                this.printMessage(this.buildChatMessage(message));
            })
        }
    }

    buildChatMessage(message) {
        const date = new Date(message.created_at);

        return `<span class="chat__message-time">${date.getHours()}:${date.getMinutes()}</span> ${message.user.username}: ${message.message}`;
    }

    printMessage(text) {
        const li = document.createElement('li');
        li.classList.add('chat__message');
        li.innerHTML = text;
        this.messages.append(li);
    }
}

export default ChatUI