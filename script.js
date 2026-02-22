const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const generateBtn = document.getElementById('generateBtn');
const qrContainer = document.getElementById('qrContainer');
const qrCode = document.getElementById('qrCode');
const downloadBtn = document.getElementById('downloadBtn');
const error = document.getElementById('error');

// Update character count
textInput.addEventListener('input', () => {
  charCount.textContent = textInput.value.length;
  hideError();
});

// Generate QR code
generateBtn.addEventListener('click', generateQR);

function generateQR() {
  const text = textInput.value.trim();
  
  if (!text) {
    showError('Please enter some text or URL');
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
    generateQR();
  }
});
