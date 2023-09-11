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

const emojiMap = {
  react: "⚛️",
  woah: "😲",
  hey: "👋",
  lol: "😂",
  like: "🤍",
  congratulations: "🎉",
};

function replacewithEmoji(message) {
  for (let keyword in emojiMap) {
    const emoji = emojiMap[keyword];
    const regex = new RegExp(`\\b${keyword}`, 'gi');
    message = message.replace(regex, emoji);
  }
  return message;
}

document.getElementById('sendButton').addEventListener('click', () => {
  const messageInput = document.getElementById('messageInput')
  const message = messageInput.value;

  if (message.trim() !== '') {
    const emojiMessage = replacewithEmoji(message);
    socket.emit('chat message', message);
    messageInput.value = '';
  }
});

socket.on('chat message', (data) => {
  const messagesDiv = document.querySelector(".messages");
  const newMessageDiv = document.createElement("div");
  newMessageDiv.className = "message received";
  newMessageDiv.textContent = replacewithEmoji(data);
  messagesDiv.appendChild(newMessageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});