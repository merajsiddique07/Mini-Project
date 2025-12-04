 const backendURL = 'http://localhost:5000/auth';

// Signup example
async function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${backendURL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  alert(data.message || JSON.stringify(data));
}

// Login example
async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${backendURL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    alert('Login successful!');
  } else {
    alert(data.message || 'Login failed');
  }
}

 
 // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

     // Mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        const navItems = document.getElementById('navItems');
        
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navItems.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav item
        const navItemElements = document.querySelectorAll('.nav-item');
        navItemElements.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 600) {
                    hamburger.classList.remove('active');
                    navItems.classList.remove('active');
                }
            });
        });

        // SOS button animation
        const sosBtn = document.querySelector('.sos-btn');
        sosBtn.addEventListener('click', function() {
            // Create a ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.top = '50%';
            ripple.style.left = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s linear';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
        });

        // Add CSS for ripple effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

         // Add a subtle pulsing effect to the main title
    const mainTitle = document.querySelector('.main-title');
    
    setInterval(() => {
        mainTitle.style.transform = 'scale(1.02)';
        setTimeout(() => {
            mainTitle.style.transform = 'scale(1)';
        }, 1000);
    }, 3000);
    
    // Add interactive effects to the moving text
    const movingText = document.querySelector('.moving-text');
    
    movingText.addEventListener('mouseenter', () => {
        movingText.style.animationPlayState = 'paused';
    });
    
    movingText.addEventListener('mouseleave', () => {
        movingText.style.animationPlayState = 'running';
    });
    document.addEventListener("DOMContentLoaded", () => {
    const authContainer = document.getElementById("auth-buttons");
    const token = localStorage.getItem("token");

    if (token) {
        // Agar login hai, show Profile + Logout
        authContainer.innerHTML = `
            <div class="profile-dropdown">
                <button id="profileBtn" class="login-signup-btn">Profile</button>
                <button id="logoutBtn" class="login-signup-btn">Logout</button>
            </div>
        `;

        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("token");
            alert("✅ Logged out successfully");
            window.location.href = "login.html";
        });

        document.getElementById("profileBtn").addEventListener("click", () => {
            window.location.href = "profile.html"; // Tumhara profile page
        });

    } else {
        // Agar login nahi hai, show Login/Signup
        authContainer.innerHTML = `
            <form action="login.html" style="display:inline;">
                <button class="login-signup-btn" type="submit">Login</button>
            </form>
            <form action="signup.html" style="display:inline;">
                <button class="login-signup-btn" type="submit">Signup</button>
            </form>
        `;
    }
});
 // Form submission handling
        document.getElementById('newsletter-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
 


/* ---------- CONFIG ---------- */
/* IMPORTANT: replace with your own key and keep it secret (don't commit to public repos) */
// 🔐 Replace with your valid key (but do NOT expose it in production frontend code)

const API_KEY = "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";
const MODEL = "openai/gpt-4o-mini";

const chatToggle = document.getElementById("chatToggle");
const chatWrapper = document.getElementById("chatWrapper");
const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const attachBtn = document.getElementById("attachBtn");
const fileInput = document.getElementById("fileInput");
const voiceBtn = document.getElementById("voiceBtn");
const refreshBtn = document.getElementById("refreshBtn");

let fileData = null;
let recognizing = false;
let recognition = null;

/* Toggle Chat */
chatToggle.onclick = () => chatWrapper.classList.toggle("active");

/* Append Message */
function append(role, html) {
  const div = document.createElement("div");
  div.className = `message ${role}`;
  div.innerHTML = html;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

/* Extract File Text */
async function extractFileText(file) {
  let text = "";
  if (file.type === "text/plain") {
    text = await file.text();
  } else if (file.type === "application/pdf") {
    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    for (let i = 1; i <= pdf.numPages; i++) {
      const p = await pdf.getPage(i);
      const c = await p.getTextContent();
      text += c.items.map(x => x.str).join(" ") + " ";
    }
  } else if (file.type.startsWith("image/")) {
    const { data: { text: ocr } } = await Tesseract.recognize(file, "eng");
    text = ocr;
  }
  return text.trim();
}

/* Attach File */
attachBtn.onclick = () => fileInput.click();

fileInput.onchange = async e => {
  const file = e.target.files[0];
  if (!file) return;

  append("bot", `📄 Reading <strong>${file.name}</strong>...`);

  const prog = document.createElement("div");
  prog.className = "progress-bar";
  prog.innerHTML = "<span></span>";
  chatBody.lastChild.appendChild(prog);

  const bar = prog.querySelector("span");
  let pct = 0;
  const int = setInterval(() => {
    if (pct < 90) {
      pct += 5;
      bar.style.width = pct + "%";
    }
  }, 200);

  try {
    const txt = await extractFileText(file);
    clearInterval(int);
    bar.style.width = "100%";
    fileData = { name: file.name, text: txt };
    append(
      "bot",
      `✅ File <em>${file.name}</em> loaded. You can now ask questions related to this file.`
    );
  } catch (err) {
    clearInterval(int);
    append("bot", "⚠ Couldn't read file.");
    console.error(err);
  }
};

/* Voice Input */
if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SR();
  recognition.lang = "en-IN";
  recognition.interimResults = false;

  recognition.onstart = () => {
    recognizing = true;
    voiceBtn.textContent = "⏹";
  };

  recognition.onresult = e => {
    const transcript = e.results[0][0].transcript;
    userInput.value = transcript;
    recognizing = false;
    voiceBtn.textContent = "🎤";
    sendMessage();
  };

  recognition.onend = () => {
    recognizing = false;
    voiceBtn.textContent = "🎤";
  };
}

voiceBtn.onclick = () => {
  if (!recognition) return alert("Voice not supported here.");
  if (!recognizing) {
    recognition.start();
  } else {
    recognition.stop();
  }
};

/* Send Message */
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text && !fileData) return;

  append("user", text || `File: ${fileData.name}`);

  const messages = [
    {
      role: "system",
      content: `You are Swasth Sarthi, an intelligent and structured AI assistant.
Always respond in *pure HTML* — never Markdown.
Rules:
- Use <h2> for headings.
- Use <p> for normal text.
- Use <strong> for key labels like "Medications:" or "Concept:".
- Never include asterisks (*), dashes (-), or numbered lists (1., 2., etc.).
If summarizing topics, wrap each title in <h2> and follow it with one or more <p> blocks.

Always end with:
<p><strong></strong> </p>`
    },
    {
      role: "user",
      content: fileData
        ? `${text}\n\nFile: ${fileData.name}\nContent:\n${fileData.text}`
        : text
    }
  ];

  userInput.value = "";
  append("bot", "⏳ Thinking...");

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.2,
        max_tokens: 700
      })
    });

    const data = await res.json();
    chatBody.lastChild.remove();
    const reply = data?.choices?.[0]?.message?.content || "Sorry, I couldn't respond.";
    append("bot", reply); // directly render HTML
  } catch (err) {
    chatBody.lastChild.remove();
    append("bot", "⚠ Error contacting AI service.");
    console.error(err);
  }
}

/* Refresh */
refreshBtn.onclick = () => {
  fileData = null;
  chatBody.innerHTML =
    '<div class="message bot"><b>Hello!</b> I\'m Swasth Sarthi, your AI health guide.<br>If you have any <strong>health-related questions or concerns</strong>, feel free to ask.</div>';
};

sendBtn.onclick = sendMessage;
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});


