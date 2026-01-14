# simple-chat-app

This is a lightweight, real-time chat application built with Node.js and Express. It utilizes Socket.io for seamless, bidirectional communication between the server and the client. 

The current frontend is built using Vanilla JavaScript and HTML/CSS for a clean, distraction-free UI.

✨ Key Feature: Text-to-Emoji MappingThe application includes a built-in "Auto-Emoji" feature. When specific keywords are typed, they are automatically 
replaced with their corresponding emojis

const emojiMap = {
  react: "⚛️",
  woah: "😲",
  hey: "👋",
  lol: "😂",
  like: "🤍",
  congratulations: "🎉",
};

🛠️ Technical Implementation

Backend: Node.js with Express handles the server-side logic and static file serving.
Real-time Communication: Socket.io manages the "Events" (e.g., chat message, typing, user connected).

Frontend Logic: A simple emojiMap object intercepts message strings before they are emitted to the server to perform replacements.

📈 Future Roadmap: 
The next phaseof this project involves migrating the current "Plain UI" to React. 
 
This will allow for:
1) Better state management for chat history.
2) Component-based architecture for message bubbles and user lists.
3) Enhanced performance through the Virtual DOM.
 
