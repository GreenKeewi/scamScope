# ScamScope - Quick Start Guide

## Prerequisites

Before you begin, make sure you have:

- Node.js 18+ installed
- npm or yarn
- Git

## Step 1: Clone and Install

```bash
git clone https://github.com/GreenKeewi/scamScope.git
cd scamScope
npm install
```

## Step 2: Set Up Clerk (Authentication)

1. Go to [https://clerk.com](https://clerk.com)
2. Create a free account
3. Create a new application
4. Go to "API Keys" in your dashboard
5. Copy your publishable key and secret key

## Step 3: Set Up Convex (Database)

1. Install Convex CLI globally (optional):
   ```bash
   npm install -g convex
   ```

2. Initialize Convex:
   ```bash
   npx convex dev
   ```

3. Follow the prompts:
   - Login or create a Convex account
   - Create a new project or select existing
   - The deployment URL will be generated automatically

## Step 4: Set Up OpenAI (Optional - for AI features)

1. Go to [https://platform.openai.com](https://platform.openai.com)
2. Create an account or sign in
3. Go to "API Keys"
4. Create a new secret key

## Step 5: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Convex Database (auto-generated from npx convex dev)
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# OpenAI (Optional)
OPENAI_API_KEY=sk-your_key_here

# UploadThing (Optional - for file uploads)
UPLOADTHING_SECRET=sk_live_your_key_here
UPLOADTHING_APP_ID=your_app_id
```

## Step 6: Run the Development Server

In one terminal, run Convex:
```bash
npx convex dev
```

In another terminal, run Next.js:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## What's Next?

- Explore the codebase in `src/app/` for pages
- Check `convex/` for database queries and mutations
- Customize components in `src/components/`
- Read the full README.md for more details

## Common Issues

### Build Fails
- Make sure all environment variables are set
- Run `npm run build` to check for errors
- Check that Convex is running (`npx convex dev`)

### Clerk Issues
- Verify your API keys are correct
- Make sure you're using the right environment (development vs production)

### Database Issues
- Make sure `npx convex dev` is running
- Check the Convex dashboard for errors
- Verify the deployment URL in `.env.local`

## Need Help?

- Check the [README.md](README.md) for detailed documentation
- Open an issue on GitHub
- Check [Clerk documentation](https://clerk.com/docs)
- Check [Convex documentation](https://docs.convex.dev)
- Check [Next.js documentation](https://nextjs.org/docs)
