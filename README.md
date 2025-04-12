# WebRTC File Sharing

A modern, secure, and efficient file sharing application built with Next.js and WebRTC technology. This application allows users to share files directly between browsers without the need for a central server to handle the file transfer.

![WebRTC File Sharing](public/screenshot.png)

## Features

- 🔒 **Secure File Transfer**: Direct peer-to-peer file sharing using WebRTC
- 🚀 **Fast Transfer Speeds**: No intermediate servers, files transfer directly between peers
- 🎨 **Modern UI**: Clean, responsive design with dark/light mode support
- 📱 **Mobile Friendly**: Works seamlessly on both desktop and mobile devices
- 🌐 **Cross-Platform**: Compatible with all modern browsers
- 🔄 **Real-time Progress**: Live transfer progress updates
- 🎯 **Drag & Drop**: Easy file selection with drag and drop support
- 🔔 **Notifications**: Real-time status updates and transfer completion alerts

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **WebRTC**: Simple-Peer
- **State Management**: React Context
- **UI Components**: Custom components with modern design
- **Animation**: Framer Motion
- **Icons**: Lucide Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/webrtc-file-sharing.git
   cd webrtc-file-sharing
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Start a New Session**:
   - Click the "Start New Session" button
   - Share the generated session ID with the recipient

2. **Join a Session**:
   - Enter the session ID provided by the sender
   - Click "Join Session"

3. **Share Files**:
   - Drag and drop files or click to select
   - Monitor transfer progress in real-time
   - Receive notifications when transfers complete

## Project Structure

```
webrtc-file-sharing/
├── app/                  # Next.js app directory
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── about/            # About page
├── components/           # React components
│   ├── background.tsx    # Animated background
│   ├── file-transfer.tsx # File transfer UI
│   ├── navbar.tsx        # Navigation bar
│   └── preloader.tsx     # Loading screen
├── public/               # Static assets
└── styles/               # Global styles
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [WebRTC](https://webrtc.org/) - Real-time communication
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Simple-Peer](https://github.com/feross/simple-peer) - WebRTC peer connection

## Support

For support, email support@example.com or join our Slack channel.

---

Made with ❤️ by [Your Name] 