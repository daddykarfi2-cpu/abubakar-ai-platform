
const http = require("http");

const PORT = process.env.PORT || 3000;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#100923">
<title>ABUBAKAR AI</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#100923;color:white;font-family:Arial,sans-serif}
header{padding:20px 6%;display:flex;justify-content:space-between;
align-items:center;border-bottom:1px solid #34204e}
.logo{font-size:22px;font-weight:bold;color:#c5a3ff}
main{max-width:850px;margin:70px auto;padding:20px;text-align:center}
h1{font-size:42px;margin-bottom:10px}
h1 span{color:#a879ff}
.sub{color:#b9adc9;line-height:1.7}
.tools{display:grid;grid-template-columns:repeat(3,1fr);
gap:12px;margin:35px 0}
.tool{background:#211337;border:1px solid #493269;
padding:20px;border-radius:14px;color:white}
.chat{background:#211337;border:1px solid #493269;
padding:15px;border-radius:16px;text-align:left}
#messages{min-height:100px;max-height:300px;overflow:auto;
padding:10px;color:#eee;line-height:1.6}
form{display:flex;gap:8px}
input{flex:1;min-width:0;padding:15px;border-radius:10px;
border:1px solid #63478a;background:#100923;color:white}
button{background:#884dff;color:white;border:0;
padding:14px 20px;border-radius:10px;font-weight:bold}
footer{margin-top:60px;color:#8e7ba8;font-size:12px}
@media(max-width:600px){
h1{font-size:32px}.tools{grid-template-columns:repeat(2,1fr)}
}
</style>
</head>
<body>
<header>
<div class="logo">✦ ABUBAKAR AI</div>
<div>Version 1.0</div>
</header>
<main>
<h1>Your World of <span>AI</span></h1>
<p class="sub">Welcome to ABUBAKAR AI SUPER APP.<br>
One platform. Many possibilities.</p>

<div class="tools">
<div class="tool">🤖<br>AI Chat</div>
<div class="tool">🎨<br>AI Images</div>
<div class="tool">🔎<br>Research</div>
<div class="tool">📚<br>Education</div>
<div class="tool">💻<br>Coding</div>
<div class="tool">🌍<br>Translation</div>
</div>

<div class="chat">
<strong>ABAT AI ASSISTANT</strong>
<div id="messages">
<p>Hello! Welcome to ABUBAKAR AI.</p>
<p>Our AI engine is being prepared.</p>
</div>
<form id="chatForm">
<input id="prompt" placeholder="Ask ABUBAKAR AI..." required>
<button type="submit">Send</button>
</form>
</div>
<footer>
ABUBAKAR AI TECHNOLOGY COMPANY<br>
Innovating Today, Transforming Tomorrow.
</footer>
</main>
<script>
const form=document.getElementById("chatForm");
const input=document.getElementById("prompt");
const messages=document.getElementById("messages");

form.addEventListener("submit",async(e)=>{
e.preventDefault();
const question=input.value.trim();
if(!question)return;

messages.innerHTML += "<p><b>You:</b> "+
question.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))+
"</p>";
input.value="";

try{
const response=await fetch("/api/chat",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({message:question})
});
const data=await response.json();
messages.innerHTML+="<p><b>ABAT AI:</b> "+data.reply+"</p>";
}catch(error){
messages.innerHTML+="<p>Connection error. Try again.</p>";
}
messages.scrollTop=messages.scrollHeight;
});
</script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return res.end(html);
  }

  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "online", company: "ABAT" }));
  }

  if (req.method === "POST" && req.url === "/api/chat") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
      if (body.length > 10000) req.destroy();
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        if (!data.message || typeof data.message !== "string") {
          res.writeHead(400);
          return res.end(JSON.stringify({ error: "Message required" }));
        }

        res.writeHead(200, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          reply: "The ABUBAKAR AI engine is not connected yet. We are preparing the real AI integration."
        }));
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid request" }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("ABUBAKAR AI running on port " + PORT);
});
