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
 /********** CONFIG **********/
  // For local testing ONLY. Do NOT deploy with a real key in public.
  const OPENAI_API_KEY = "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";
  const OPENAI_MODEL = "gpt-4o-mini";  // cheap & good

  /********** DOM ELEMENTS **********/
  const toggleBtn = document.getElementById("ss-chat-toggle");
  const chatWrapper = document.getElementById("ss-chat-wrapper");
  const messagesEl = document.getElementById("ss-chat-messages");
  const inputEl = document.getElementById("ss-user-input");
  const sendBtn = document.getElementById("ss-send-btn");
  const refreshBtn = document.getElementById("ss-refresh-btn");
  const attachBtn = document.getElementById("ss-attach-btn");
  const fileInput = document.getElementById("ss-file-input");
  const fileInfo = document.getElementById("ss-file-info");

  let uploadedFileContent = "";        // text from file (truncated)
  let uploadedFileName = "";

  /********** UI BEHAVIOUR **********/
  toggleBtn.addEventListener("click", () => {
    const isOpen = chatWrapper.style.display === "flex";
    chatWrapper.style.display = isOpen ? "none" : "flex";

    if (!isOpen && messagesEl.childElementCount === 0) {
      // first open -> welcome message
      addBotMessage(
        "Hello! I'm Swasth Sarthi, your personal AI health assistant.\nIf you have any **health-related questions**, feel free to ask."
      );
    }
  });

  refreshBtn.addEventListener("click", () => {
    messagesEl.innerHTML = "";
    uploadedFileContent = "";
    uploadedFileName = "";
    fileInfo.textContent = "";
    addBotMessage("Chat refreshed. How can I help you today?");
  });

  sendBtn.addEventListener("click", () => {
    const text = inputEl.value.trim();
    if (!text) return;
    handleUserMessage(text);
  });

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });

  /********** FILE HANDLING **********/
  attachBtn.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) {
      fileInfo.textContent = "";
      uploadedFileContent = "";
      uploadedFileName = "";
      return;
    }

    uploadedFileName = file.name;
    fileInfo.textContent = `Attached: ${file.name}`;

    const reader = new FileReader();

    // Try to read as text; for binary files it may look strange but still "read"
    reader.onload = () => {
      const text = reader.result || "";
      // limit size to avoid huge prompts
      uploadedFileContent = text.slice(0, 8000);
      addBotMessage(
        `I've loaded the file **${file.name}**.\nI'll use its text content as context for your next questions.`
      );
    };

    // For some types (pdf, docx) this will not be perfect,
    // but it's the simplest front-end only approach.
    reader.readAsText(file);
  });

  /********** CHAT FLOW **********/
  function addMessage(role, text) {
    const msg = document.createElement("div");
    msg.className = "ss-message " + (role === "bot" ? "ss-bot" : "ss-user");
    msg.innerHTML = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addBotMessage(text) {
    addMessage("bot", text);
  }

  function addUserMessage(text) {
    addMessage("user", text);
  }

  async function handleUserMessage(text) {
    addUserMessage(text);
    inputEl.value = "";
    sendBtn.disabled = true;

    const thinkingId = "ss-thinking";
    addBotMessage("⏳ Thinking...");
    const thinkingEl = messagesEl.lastElementChild;
    thinkingEl.id = thinkingId;

    try {
      const reply = await callOpenAI(text);
      // replace thinking message
      thinkingEl.remove();
      addBotMessage(reply);
    } catch (err) {
      console.error(err);
      thinkingEl.remove();
      addBotMessage(
        "Sorry, something went wrong while contacting the AI API. " +
        "Check your internet connection or API key configuration."
      );
    } finally {
      sendBtn.disabled = false;
    }
  }

  /********** OPENAI CALL **********/
  async function callOpenAI(userText) {
    if (!OPENAI_API_KEY || OPENAI_API_KEY === "YOUR_OPENAI_API_KEY_HERE") {
      throw new Error("API key not set");
    }

    // Build system prompt with optional file content
    let systemContent =
      "You are Swasth Sarthi, a friendly medical assistant on a healthcare website. " +
      "Answer clearly in simple language, and remind users that you are not a doctor and cannot give a diagnosis. " +
      "Encourage them to consult a healthcare professional for serious or urgent issues.";

    if (uploadedFileContent) {
      systemContent +=
        "\n\nThe user has also provided a file. Here is its text content (may be truncated):\n" +
        uploadedFileContent;
    }

    const body = {
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: userText }
      ]
    };

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error("OpenAI error:", txt);
      throw new Error("OpenAI API error");
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || "I couldn't generate a reply.";
    return reply;
  }

 // Optional: open chat by default when page loads
 // toggleBtn.click();