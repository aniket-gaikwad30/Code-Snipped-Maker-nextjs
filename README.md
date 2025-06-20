# Code Snippet Maker

A beautiful, modern web application for creating, organizing, and sharing code snippets with syntax highlighting, tagging, and search functionality.

## ✨ Features

- **🎨 Modern UI**: Glassmorphism design with gradient backgrounds and smooth animations
- **📝 Code Highlighting**: Live syntax highlighting with Prism.js
- **🏷️ Smart Tagging**: Organize snippets with custom tags
- **🔍 Search & Filter**: Find snippets by title, code, or tags
- **📱 Responsive**: Mobile-friendly design that works on all devices
- **🌙 Dark Mode**: Toggle between light and dark themes
- **📋 Copy to Clipboard**: One-click code copying with animated feedback
- **⚡ Fast Performance**: Optimized with Next.js 15 and Turbopack

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom animations
- **Database**: Prisma ORM with SQLite (easily switchable to PostgreSQL)
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Code Highlighting**: Prism React Renderer
- **Toasts**: React Hot Toast

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd code-snippet-maker-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your database URL:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
```bash
npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── snippet/           # Snippet routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── snippet/          # Snippet-specific components
├── actions/              # Server actions
├── lib/                  # Utility functions
└── generated/            # Generated Prisma types
```

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     ```
     DATABASE_URL=your_database_url
     ```
   - Deploy!

### Option 2: Railway

1. **Connect to Railway**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Add PostgreSQL database
   - Set environment variables

2. **Deploy**
   ```bash
   npm run build
   ```

### Option 3: Self-hosted

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Database connection string | Yes |
| `NODE_ENV` | Environment (production/development) | No |

## 🗄️ Database

### SQLite (Development)
```env
DATABASE_URL="file:./dev.db"
```

### PostgreSQL (Production)
```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

### Schema
```prisma
model Snippet {
  id      Int      @id @default(autoincrement())
  title   String
  code    String
  tags    String[]
}
```

## 🎨 Customization

### Colors and Themes
Edit `src/app/globals.css` to customize:
- Color schemes
- Animations
- Glassmorphism effects
- Gradients

### Components
All UI components are in `src/components/ui/` and can be customized to match your brand.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Prisma](https://prisma.io/) for the database toolkit
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Framer Motion](https://www.framer.com/motion/) for animations

---

Made with ❤️ for developers
