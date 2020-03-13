import nengi from 'nengi'

class ChatMessage {
    constructor(text) {
        this.text = text
    }
}
ChatMessage.protocol = {
    text: nengi.String,
    author: nengi.String
}

export default ChatMessage