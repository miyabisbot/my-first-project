# QR Code Generator Website - Project Plan

## Overview
A simple web app that generates QR codes from URLs or plain text input.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript (vanilla for simplicity)
- **QR Library:** qrcode.js or similar client-side library
- **Hosting:** Static files (can deploy anywhere)

## Features

### Core Features
1. **Text Input** — Text area for URL or plain text (max ~2000 chars)
2. **Generate Button** — Triggers QR code generation
3. **QR Display** — Shows generated QR code in real-time
4. **Download** — Button to download QR as PNG

### UI/UX
- Clean, minimal design
- Responsive (works on mobile)
- Error handling for empty input

## File Structure
```
qr_gen/
├── index.html      # Main HTML
├── style.css       # Styling
├── script.js       # Logic
└── README.md       # Docs
```

## Steps
1. Create HTML structure with input field + generate button
2. Add CSS for clean, centered layout
3. Implement JS to generate QR using library
4. Add download functionality
5. Test with various inputs

## Time Estimate
- ~30-45 min for full implementation
