# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/ee6cfb1a-f64f-4962-9572-894b47b7f639

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ee6cfb1a-f64f-4962-9572-894b47b7f639) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ee6cfb1a-f64f-4962-9572-894b47b7f639) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

---

## Supabase configuration 🔧

This project now uses **Supabase** instead of Firebase. Add the following environment variables to your `.env` or hosting provider:

- `VITE_SUPABASE_URL` — your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — your Supabase anonymous (public) key

Create a storage bucket named `blog-images` for image uploads, and a `posts` table for blog posts. Ensure the `posts` table has at least columns: `id` (primary key), `slug`, `title`, `description`, `author`, `content`, `tags` (array), `image`, `published` (boolean), `date` (timestamp).

---

Migration steps (recommended):

1. Install the Supabase CLI: https://supabase.com/docs/guides/cli
2. Login and link your project: `supabase login` and `supabase link --project-ref <your-ref>`
3. Apply SQL migrations (from this repo):
   - `supabase db push --file supabase/init.sql`
4. Create a storage bucket `blog-images` in the Supabase dashboard and set its public access as needed.

Notes:
- The SQL in `supabase/init.sql` creates the `posts` table, a sample post, and basic RLS policies so public visitors can read published posts while authenticated users can read and modify posts.
- After creating the project, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your hosting provider (Netlify, Vercel, etc.) or `.env` for local dev.

