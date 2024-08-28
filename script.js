// Matrix Effect
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(canvas.width / fontSize)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0'; // Green text
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrix, 30);

// Registration, OTP, and Login Logic
const users = {};
let generatedOtp = null;
let registeredUsername = null;
let registeredPassword = null;

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
}

function sendOtp(username) {
    generatedOtp = generateOtp();
    console.log(`Sending OTP: ${generatedOtp} to ${username}`);
    // Integrate with an email or SMS API to send the OTP
}

function register(event) {
    event.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    if (users[username]) {
        alert('Username already exists! Please use a different phone number or email.');
        return;
    }

    registeredUsername = username;
    registeredPassword = password;

    sendOtp(username);

    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'block';
}

function verifyOtp(event) {
    event.preventDefault();
    const otpInput = document.getElementById('otpInput').value;

    if (parseInt(otpInput) === generatedOtp) {
        users[registeredUsername] = registeredPassword;
        alert('Registration successful! You can now log in.');

        document.getElementById('otpForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    } else {
        alert('Incorrect OTP. Please try again.');
    }
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (users[username] && users[username] === password) {
        alert('Login successful!');
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('chatBox').style.display = 'block';
    } else {
        alert('Incorrect username or password. Please try again.');
    }
}

function sendMessage() {
    const message = document.getElementById('messageInput').value;
    if (message.trim() !== '') {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        document.getElementById('messages').appendChild(messageElement);

        // Clear the message input field
        document.getElementById('messageInput').value = '';

        // Automatically delete the message after 5 minutes (300000 ms)
        setTimeout(() => {
            messageElement.remove();
        }, 10000); // 10 seconds for demonstration purposes, replace with 300000 for 5 minutes
    }
}

// Simulate loading time
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        document.getElementById('registrationForm').style.display = 'block';
    }, 10000); // 10 seconds loading time
};

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});