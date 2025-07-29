# 🔐 LoginRegister1

A full-stack web application with user authentication, featuring a modern UI with smooth animations and video playback functionality.

## ✨ Features

- **User Authentication**: Secure login and registration system
- **JWT Token Management**: Automatic token-based authentication with persistence
- **Responsive Design**: Mobile-friendly interface with modern styling
- **Smooth Animations**: GSAP-powered transitions and visual feedback
- **Video Integration**: Streaming video playback on the welcome page
- **Real-time Validation**: Client-side form validation with visual feedback
- **Session Persistence**: Automatic login on page refresh
- **Error Handling**: Comprehensive error messages and status codes
- **Production Ready**: Optimized build process and deployment scripts

## 🛠️ Tech Stack

### Frontend
- **Vanilla JavaScript** - Core functionality
- **HTML5/CSS3** - Modern markup and styling
- **Sass** - CSS preprocessing
- **Vite** - Build tool and development server
- **GSAP** - Animation library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### DevOps & Tools
- **Docker** - Containerization
- **PNPM** - Package manager
- **Git** - Version control

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)
- **PNPM** package manager
- **PostgreSQL** database
- **Git** for version control

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd LoginRegister1
```

### 2. Install Dependencies
```bash
# Install root dependencies
pnpm install

# Install frontend dependencies
cd frontend
pnpm install

# Install backend dependencies
cd ../backend
pnpm install
```

### 3. Database Setup
```bash
cd backend
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push
```

## ⚙️ Configuration

### Backend Environment Variables
Create a `.env` file in the `backend` directory:

```env
DATABASE_URL="postgresql://username:password@host:port/database"
ACCESS_TOKEN_SECRET="your-secret-key-here"
TOKEN_EXPIRES_IN="1h"
PORT=9090
```

### Frontend Environment Variables
Create a `.env` file in the `frontend` directory:

```env
VITE_BACKEND_PATH="http://localhost:9090"
VITE_LOGIN_TOKEN="login_token"
```

### Public Network Configuration
For external access, update `frontend/vite.config.js`:

```javascript
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['your-domain.com']
  }
})
```

## 🎯 Usage

### Development Mode

#### Option 1: Manual Start
```bash
# Terminal 1 - Backend
cd backend
pnpm start

# Terminal 2 - Frontend  
cd frontend
pnpm dev:host
```

#### Option 2: Script Start (Daemon Mode)
```bash
# Start both services as background processes
./start_services.sh

# Stop all services
./stop_services.sh

# Check service status
./check_services.sh
```

#### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:9090

### Production Deployment

#### 1. Build Frontend
```bash
cd frontend
npm run build
```

#### 2. Deploy Production Version
```bash
# Stop development services
./stop_services.sh

# Start production services
cd backend
nohup pnpm start > backend.log 2>&1 &

cd ../frontend
nohup npx serve dist -l 3000 > serve.log 2>&1 &
```

#### 3. Using Docker (Alternative)
```bash
# Build and start with Docker Compose
docker-compose up -d --build

# Stop Docker services
docker-compose down
```

## 📡 API Endpoints

### Authentication

#### POST `/api/register`
Register a new user account.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "user created",
  "code": "0",
  "username": "string"
}
```

#### POST `/api/login`
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "login success",
  "code": "0",
  "username": "string",
  "token": "jwt-token"
}
```

### Response Codes
- `"0"`: Success
- `"1"`: Invalid credentials / User exists
- `"2"`: Missing required fields
- `"3"`: Server error

## 📁 Project Structure

```
LoginRegister1/
├── frontend/                 # Frontend application
│   ├── src/                 # Source files
│   │   ├── animation.js     # GSAP animations
│   │   ├── dom.js          # DOM element references
│   │   ├── utils.js        # Utility functions
│   │   └── videoControler.js # Video management
│   ├── dist/               # Production build (generated)
│   ├── index.html          # Main HTML file
│   ├── index.js            # Main JavaScript file
│   ├── index.scss          # Main stylesheet
│   ├── vite.config.js      # Vite configuration
│   └── package.json        # Frontend dependencies
├── backend/                 # Backend application
│   ├── src/                # Source files
│   │   ├── api/            # API route handlers
│   │   ├── utils/          # Utility functions
│   │   └── lib/            # Library functions
│   ├── prisma/             # Database schema and migrations
│   ├── index.js            # Main server file
│   └── package.json        # Backend dependencies
├── docker-compose.yaml      # Docker configuration
├── start_services.sh       # Start daemon processes
├── stop_services.sh        # Stop all processes
└── check_services.sh       # Check process status
```

## 📜 Available Scripts

### Root Level
- `pnpm docker:build` - Build Docker containers
- `pnpm docker:up` - Start with Docker Compose  
- `pnpm docker:down` - Stop Docker containers

### Frontend
- `pnpm dev` - Start development server (localhost only)
- `pnpm dev:host` - Start development server (public access)
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

### Backend
- `pnpm start` - Start production server
- `pnpm dev` - Start development server (if configured)

### System Scripts
- `./start_services.sh` - Start as daemon processes
- `./stop_services.sh` - Stop all processes
- `./check_services.sh` - Check running processes

## 🔒 Security Features

- **Password Hashing**: Secure bcrypt hashing
- **JWT Authentication**: Token-based authentication
- **CORS Protection**: Configurable cross-origin policies  
- **Input Validation**: Server-side request validation
- **SQL Injection Protection**: Prisma ORM parameterized queries

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop and mobile
- **Smooth Animations**: Page transitions and visual feedback
- **Form Validation**: Real-time input validation
- **Error States**: Visual error indicators
- **Loading States**: Progress indicators for async operations
- **Video Integration**: Streaming video playback

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill processes on ports 3000/9090
pkill -f "node.*3000"
pkill -f "node.*9090"
```

#### Database Connection Error
1. Check PostgreSQL is running
2. Verify DATABASE_URL in `.env`
3. Run `npx prisma db push` to sync schema

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
pnpm install
```

#### Permission Denied on Scripts
```bash
chmod +x *.sh
```

## 🚀 Deployment Tips

### For Production:
1. Always use the built version (`npm run build`)
2. Set secure environment variables
3. Use HTTPS in production
4. Configure proper CORS settings
5. Monitor logs regularly

### For Development:
1. Use `dev:host` for network access
2. Check logs with `tail -f *.log`
3. Use daemon mode to persist across sessions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Created at 2025-07-28 04:32:26

---

For questions or support, please open an issue in the repository.
