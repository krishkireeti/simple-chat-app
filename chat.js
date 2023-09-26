const socket = io();
let username;

do {
  username = prompt("Please enter your username:");
} while (!username);

socket.emit("user joined", username);

socket.on("updateUserList", (users) => {
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
    if (message.startsWith('/')){
     handleSlashCommand(message.trim().toLowerCase());
    }
    else{
      const emojiMessage = replacewithEmoji(message);
      socket.emit('chat message', message);
    }
    messageInput.value = '';
  }
});

function handleSlashCommand(command) {
  switch(command) {
    case "/help" :
      displayHelpMessage();
      break;
    case "/random":
      displayRandomNumber();
      break;
    case "/clear":
      clearChat();
      break;
    default:
      displayErrorMessage("Unknown command. Type /help for a list of commands.");      
  }
}

function displayHelpMessage() {
  const helpMessage = `
  /help - Show this message
  /random - print a random number
  /clear - Clear the chat
  `;

  const modal = document.getElementById('helpModal');
  const closeBtn = document.querySelector('.close-btn');
  const helpText = document.getElementById('helpText');

  // Set the modal content
  helpText.textContent = helpMessage;

  // Display the modal
  modal.style.display = "block";

  // Close the modal when the close button is clicked
  closeBtn.onclick = function() {
    modal.style.display = "none";
  }

  // Also close the modal if anywhere outside the modal content is clicked
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}


function displayRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  appendMessageToChat("Here's your random number: " + randomNumber);
}

function clearChat() {
  const messagesDiv = document.querySelector(".messages");
  messagesDiv.innerHTML = '';
}

function displayErrorMessage(errorMessage) {
  appendMessageToChat(errorMessage);
}

function appendMessageToChat(message) {
  const messagesDiv = document.querySelector(".messages");
  const newMessageDiv = document.createElement("div");
  newMessageDiv.className = "message system"; // "system" to differentiate system messages from user messages
  newMessageDiv.textContent = message;
  messagesDiv.appendChild(newMessageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

socket.on('chat message', (data) => {
  const messagesDiv = document.querySelector(".messages");
  const newMessageDiv = document.createElement("div");
  newMessageDiv.className = "message received";
  newMessageDiv.textContent = replacewithEmoji(data);
  messagesDiv.appendChild(newMessageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});