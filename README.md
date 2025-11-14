# ScamScope

A community-driven platform where anyone can search scams, view AI-generated summaries, read community insights, and contribute their own reports.

## 🎯 Features

### Core Features (V1)
- **Search & Browse Scams**: Full-text search with AI-powered similarity detection
- **Detailed Scam Reports**: 
  - User-written descriptions
  - AI-generated summaries
  - Tags and categories
  - Red flags section
  - Timeline and sources
  - Related scams suggestions
- **Community Engagement**:
  - Threaded comments (Reddit-style)
  - Upvote/downvote system
  - Save/bookmark scams
  - User profiles
- **Content Management**:
  - Submit new scam reports
  - Edit your own posts
  - Moderation dashboard
- **AI Features**:
  - AI-generated scam summaries
  - AI similarity detection
  - AI category/tag suggestions
  - AI flagging of suspicious posts

### Design & UX
- Clean, minimal, elegant design (Notion-inspired)
- Community-centered structure (Reddit/HN-style)
- Full responsive design
- Dark mode support
- Ad slots integrated throughout

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Accounts for:
  - [Clerk](https://clerk.com) (for authentication)
  - [Convex](https://convex.dev) (for database)
  - [OpenAI](https://openai.com) (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GreenKeewi/scamScope.git
   cd scamScope
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Fill in the environment variables (see Configuration section below).

4. **Initialize Convex**
   ```bash
   npx convex dev
   ```
   
   This will:
   - Create a new Convex project (or link to existing)
   - Generate the Convex deployment URL
   - Set up the database schema
   - Start the development server

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Configuration

### Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Copy your API keys from the dashboard
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

### Convex Database

1. Run `npx convex dev` in your project
2. Follow the prompts to create or link a project
3. Copy the deployment URL
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
   ```

The Convex schema is already defined in `convex/schema.ts` and includes:
- Users
- Scams
- Comments
- Votes
- Saved scams

### OpenAI (for AI Features)

1. Get your API key from [OpenAI Platform](https://platform.openai.com)
2. Add to `.env.local`:
   ```env
   OPENAI_API_KEY=sk-...
   ```

### UploadThing (Optional - for file uploads)

1. Create an account at [UploadThing](https://uploadthing.com)
2. Get your credentials
3. Add to `.env.local`:
   ```env
   UPLOADTHING_SECRET=sk_live_...
   UPLOADTHING_APP_ID=your_app_id
   ```

## 📁 Project Structure

```
scamScope/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Landing page
│   │   ├── search/            # Search page
│   │   ├── scam/[id]/         # Scam detail page
│   │   ├── submit/            # Submit scam page
│   │   ├── profile/           # User profile
│   │   └── moderation/        # Moderation dashboard
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── header.tsx         # Site header
│   │   ├── search-hero.tsx    # Landing page hero
│   │   ├── comment-section.tsx # Comments component
│   │   └── ...
│   └── lib/                   # Utility functions
│       └── utils.ts           # Helper utilities
├── convex/                    # Convex backend
│   ├── schema.ts              # Database schema
│   ├── users.ts               # User queries/mutations
│   ├── scams.ts               # Scam queries/mutations
│   ├── comments.ts            # Comment queries/mutations
│   ├── votes.ts               # Voting system
│   └── savedScams.ts          # Saved scams
├── public/                    # Static assets
├── .env.example               # Environment variables template
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── package.json               # Dependencies
```

## 🎨 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Clerk
- **Database**: Convex
- **AI**: OpenAI API
- **File Uploads**: UploadThing
- **Icons**: Lucide React
- **Date Formatting**: date-fns

## 📖 Usage

### For Users

1. **Search Scams**: Use the search bar on the homepage or dedicated search page
2. **View Details**: Click on any scam to see full details, AI summary, and comments
3. **Sign In**: Click "Sign In" to create an account (required for contributing)
4. **Submit Report**: Click "Submit Scam" to report a new scam
5. **Engage**: Comment, vote, and save scams you find useful
6. **Profile**: View your submitted scams, saved items, and comment history

### For Moderators

1. Access the moderation dashboard at `/moderation`
2. Review pending scam submissions
3. Approve or reject reports
4. Manage flagged content

## 🔧 Development

### Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Start Convex dev environment
npx convex dev
```

### Adding New Features

1. **Database Changes**: Update `convex/schema.ts` and create new query/mutation files
2. **UI Components**: Add components to `src/components/`
3. **Pages**: Create new routes in `src/app/`
4. **Styling**: Use Tailwind classes and customize in `tailwind.config.ts`

## 🎨 Theme Customization

The theme colors are defined in `src/app/globals.css`:

**Light Mode:**
- Text: `hsl(255, 40%, 2%)`
- Background: `hsl(252, 45%, 98%)`
- Primary: `hsl(252, 60%, 54%)`
- Secondary: `hsl(252, 73%, 71%)`
- Accent: `hsl(252, 86%, 61%)`

**Dark Mode:**
- Text: `hsl(255, 40%, 98%)`
- Background: `hsl(255, 40%, 2%)`
- Primary: `hsl(252, 60%, 46%)`
- Secondary: `hsl(252, 73%, 29%)`
- Accent: `hsl(252, 86%, 39%)`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Self-hosted with Docker

Make sure to:
1. Set all environment variables
2. Build with `npm run build`
3. Ensure Convex is in production mode

## 🔮 Future Features

- Scam-lookup browser extension
- Real-time scam alerts (email/SMS)
- "Is this legit?" AI chat scanner
- Leaderboards for top contributors
- Verified scam investigators
- API for third-party apps
- Advanced moderator dashboards
- AI auto-blocking of fake submissions

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 💬 Support

For issues or questions:
- Open an issue on GitHub
- Check existing issues first
- Provide detailed information about your problem

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Authentication by [Clerk](https://clerk.com)
- Database by [Convex](https://convex.dev)
- AI powered by [OpenAI](https://openai.com)
