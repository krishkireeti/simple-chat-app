const socket = io();
let username;

do {
    username = prompt("Please enter your username:");
} while (!username);

socket.emit("user joined", username);

socket.on("update userlist", (users) => {
  const contactsList = document.querySelector(".contact-list");
  contactsList.innerHTML = ""; // Clear the list first

  users.forEach((user) => {
    const contactItem = document.createElement("li");
    contactItem.className = "contact";

    const contactNameSpan = document.createElement("span");
    contactNameSpan.className = "contact-name";
    contactNameSpan.textContent = user;

    contactItem.appendChild(contactNameSpan);
    contactsList.appendChild(contactItem);
  });

});

document.getElementById('sendButton').addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput')
    const message = messageInput.value;
    if (message.trim() !== '') {
        socket.emit('chat message', message);
        messageInput.value = '';
    }
});

socket.on('chat message', (data) => {
    const messagesDiv = document.querySelector(".messages");
    const newMessageDiv = document.createElement("div");
    newMessageDiv.className = "message received";
    newMessageDiv.textContent = data;
    messagesDiv.appendChild(newMessageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});