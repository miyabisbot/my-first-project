const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const generateBtn = document.getElementById('generateBtn');
const qrContainer = document.getElementById('qrContainer');
const qrCode = document.getElementById('qrCode');
const downloadBtn = document.getElementById('downloadBtn');
const error = document.getElementById('error');

let debounceTimer = null;

// Update character count and generate QR in real-time
textInput.addEventListener('input', () => {
  charCount.textContent = textInput.value.length;
  hideError();
  
  // Real-time QR generation with debounce (300ms delay)
  const text = textInput.value.trim();
  if (text) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      generateQR(text);
    }, 300);
  } else {
    // Clear QR when input is empty
    qrCode.innerHTML = '';
    qrContainer.classList.add('hidden');
  }
});

// Generate QR code
generateBtn.addEventListener('click', () => {
  const text = textInput.value.trim();
  if (text) {
    generateQR(text);
  } else {
    showError('Please enter some text or URL');
  }
});

function generateQR(text) {
  if (!text) {
    return;
  }
  
  hideError();
  qrCode.innerHTML = '';
  
  QRCode.toCanvas(text, {
    width: 256,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  }, (err, canvas) => {
    if (err) {
      showError('Error generating QR code');
      console.error(err);
      return;
    }
    
    qrCode.appendChild(canvas);
    qrContainer.classList.remove('hidden');
    
    // Trigger particle explosion effect
    createParticleExplosion();
  });
}

// Download QR code
downloadBtn.addEventListener('click', () => {
  const canvas = qrCode.querySelector('canvas');
  if (!canvas) return;
  
  const link = document.createElement('a');
  link.download = 'qrcode.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

function showError(message) {
  error.textContent = message;
  error.classList.remove('hidden');
}

function hideError() {
  error.classList.add('hidden');
}

// Allow Enter key to generate (with Ctrl/Cmd)
textInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    generateQR(textInput.value.trim());
  }
});

// Particle explosion effect
function createParticleExplosion() {
  const particleContainer = document.getElementById('particleContainer');
  particleContainer.innerHTML = ''; // Clear old particles
  
  const particleCount = 30; // More particles
  const colors = ['#667eea', '#764ba2', '#a855f7', '#ec4899', '#f472b6', '#fbbf24', '#34d399'];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Bigger particles - 10-16px
    const size = 10 + Math.random() * 6;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Larger distance - 150-250px
    const angle = (Math.random() * 360) * (Math.PI / 180);
    const distance = 150 + Math.random() * 100;
    const duration = 0.5 + Math.random() * 0.5; // 0.5-1s
    
    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    
    // Create unique keyframes for this particle
    const keyframes = `
      @keyframes shoot${i} {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        100% {
          opacity: 0;
          transform: translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0);
        }
      }
    `;
    
    // Add keyframes to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);
    
    // Set animation
    particle.style.animation = `shoot${i} ${duration}s ease-out forwards`;
    particle.style.animationDelay = `${Math.random() * 0.15}s`;
    
    particleContainer.appendChild(particle);
  }
  
  // Clean up particles after animation
  setTimeout(() => {
    particleContainer.innerHTML = '';
  }, 1500);
}
