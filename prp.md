Product Name (working title): ScamScope
One-sentence idea: A community-driven platform where anyone can search scams, view AI-generated summaries, read community insights, and contribute their own reports.

🎯 Target Audience

Open to everyone — everyday people who want to quickly check if something is a scam, browse reports, or share their experience.

🧭 User Journey / Flow

Landing Page → clean, elegant, with search bar + hero + how the site works + ad slots.

Search for a Scam → results auto-ranked with AI similarity.

View Scam Page

Title, detailed description

AI-generated summary

Tags/categories

Red flags

Timeline + sources

Screenshots/links (optional)

Related scams suggested by AI

Comment thread (Reddit-style replies)

Interact

Read threaded comments

Upvote/downvote (requires login)

Save scam (requires login)

Contribute

Submit a new scam (requires login)

Add comments or replies (requires login)

Profile Page

Username, pfp

Saved scams

Comment history

Submitted scams

Admin/Mod Flow (internal)

Approve flagged reports

Review AI-flagged issues

Manage categories & tags

Full responsive design with ad spaces across pages.

📦 Core Features (V1)
Search + Scam Pages

Scam database with:

title

user-written description

AI-generated summary

tags/categories suggested by AI

red flags section

similarity links using AI

screenshots/links (optional)

Full-text search with filters

Ad placements on search + detail pages

Community Features

Threaded comments (Reddit style)

Upvote/downvote

Save/bookmark scams

User profiles

Submit new scams

Edit your own posts

AI Features

AI-generated scam summaries

AI similarity detection → “related scams”

AI flagging of suspicious/fake posts

AI category/tag suggestions

Auth + Account System (Clerk)

Sign up / login

Profiles

Restricted actions: saving, submitting, commenting, voting

Database (Convex)

Store all:

scam entries

AI summaries + category suggestions

user data: profile, saved scams

comments + threaded replies

votes (up/down)

submitted scam reports

screenshot URLs

AI flags + similarity scores

Design + UI

Uses shadcn/ui everywhere

Uses your light/dark theme variables:

:root[data-theme="light"] {
  --text: hsl(255, 40%, 2%);
  --background: hsl(252, 45%, 98%);
  --primary: hsl(252, 60%, 54%);
  --secondary: hsl(252, 73%, 71%);
  --accent: hsl(252, 86%, 61%);
}
:root[data-theme="dark"] {
  --text: hsl(255, 40%, 98%);
  --background: hsl(255, 40%, 2%);
  --primary: hsl(252, 60%, 46%);
  --secondary: hsl(252, 73%, 29%);
  --accent: hsl(252, 86%, 39%);
}


Minimal + elegant (Notion vibe)

Community/forum behaviors (Reddit vibe)

Clear ad slots on landing, sidebar, and detail pages

Pages (all fully working in V1)

Landing page

Search results

Scam detail

Submit scam

Edit scam

User profile

Settings

Login/register

404 page

Moderation dashboard (light version)

🧰 Suggested Tools / Stack

Auth: Clerk

Database: Convex

UI: shadcn/ui

AI: OpenAI or Anthropic

Framework: Next.js app router

Styling: Tailwind + your theme colors

File uploads: UploadThing or similar

Ads: placeholder components with provider hooks

🎨 Vibe + Design Notes

Minimal, elegant, clean (Notion-like)

Community-centered structure (Reddit/HN flow)

Generous spacing and readable typography

Dark mode included

Ad areas integrated without breaking cleanliness

🔮 Future Feature Ideas

Scam-lookup browser extension

Real-time scam alerts (email/SMS)

“Is this legit?” AI chat scanner

Leaderboards for top contributors

Verified scam investigators

API for third-party apps

Advanced moderator/admin dashboards

AI auto-blocking of obvious fake submissions

📘 Final Note

Generate a README that explains how to install, configure Clerk, connect Convex, run the dev server, and manage env variables.
