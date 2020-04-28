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

    joinRoom(room = 1) {
        if (this.chatRoom === null || this.chatRoom !== room) {
            console.join(room);
        }
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
            this.printMessage(message);
            this.input.value = "";
        }
        this.input.blur();
    }

    receiveMessages(event) {
        const messages = event.detail.messages;
        if (messages.length > 0) {
            messages.forEach(message => {
                this.printMessage(message);
            })
        }
    }

    getCombinedElement(node = 'div', content = '', cssClass = '', escape = true) {
        console.log(node, content, cssClass, escape);
        const element = document.createElement(node);
        console.log(element);
        cssClass.length > 0 ? element.classList.add(cssClass) : null;
        escape ? element.textContent = content : element.innerHTML = content;
        return element;
    }

    printMessage(message) {
        const date = new Date(message.created_at);
        const time = this.getCombinedElement('span', `${date.getHours()}:${date.getMinutes()}`, 'chat__message-time');
        const username = this.getCombinedElement('span', message.user.username);
        const text = this.getCombinedElement('span', message.message);

        const chatMessage = this.getCombinedElement('li', `${time.outerHTML} ${username.outerHTML}: ${text.outerHTML}`, 'chat__message', false);
        this.messages.append(chatMessage);
    }
}

export default ChatUI