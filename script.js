
// socket code in Js
const socket = io.connect('http://localhost:8080')

// get username
const username = prompt("Enter your name");

// emite the username to the server
socket.emit("join", username);

// get the element
const messageList = document.getElementById('message-list');
const inputMessage = document.getElementById('message-input');
const sendMessage = document.getElementById('send-button');

sendMessage.addEventListener("click", function () {
    // read message from input and send to the server
    const message = inputMessage.value;
    if (message) {
        // socket function to emit data
        socket.emit('new_message', message);

        // update the message list
        // create a new element with type div
        const messageElement = document.createElement("div");
        messageElement.innerText = username + ":" + message;

        // append to the message list
        messageList.appendChild(messageElement);

        // reset value of text box emty
        inputMessage.value = "";
    }
});


// listen to broadcast message and update the message list
socket.on('broadcast_message', (userMessage)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = userMessage.username + ":" + userMessage.message;
    messageList.appendChild(messageElement);
});


// 