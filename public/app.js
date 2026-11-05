
const form = document.getElementById("chatForm");
const input = document.getElementById("prompt");
const messages = document.getElementById("messages");
const menuBtn = document.getElementById("menuBtn");

function addMessage(sender, text) {
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = sender + ": ";
  p.appendChild(strong);
  p.appendChild(document.createTextNode(text));
  p.style.marginBottom = "14px";
  messages.appendChild(p);
  messages.scrollTop = messages.scrollHeight;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = input.value.trim();
  if (!message) return;

  addMessage("You", message);
  input.value = "";

  const button = form.querySelector("button");
  button.disabled = true;
  button.textContent = "Sending...";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    addMessage("ABAT AI", data.reply || "No response received.");

  } catch (error) {
    addMessage("System", "Unable to connect. Please try again.");
  } finally {
    button.disabled = false;
    button.textContent = "Send ↑";
    input.focus();
  }
});

menuBtn.addEventListener("click", () => {
  alert("ABUBAKAR AI PLATFORM MENU");
});

async function checkServer() {
  try {
    const response = await fetch("/health");
    const data = await response.json();
    console.log("ABAT Server:", data.status);
  } catch {
    console.log("Server connection unavailable");
  }
}

checkServer();
