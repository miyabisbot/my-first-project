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
    
    // Trigger animations for lifeful effect
    qrCode.classList.remove('animate-shake', 'animate-pop');
    void qrCode.offsetWidth; // Force reflow to restart animation
    qrCode.classList.add('animate-pop');
    setTimeout(() => qrCode.classList.add('animate-shake'), 400);
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
