# Email Login Setup (Supabase)

The site uses **Supabase Auth** with email only: email + password, plus an optional "email me a sign-in link". No social logins.

Supabase project: **radar deposit growth** (`iwqtoyjzbzulyvkugfar`)

## What's already done

### Database (applied to the live project)

Migration `supabase/migrations/20261022020907_create_profiles_for_email_auth.sql`:

- `public.profiles`: one row per user (`full_name`, `institution`, `job_title`, `email`, timestamps).
- A row is created automatically when someone signs up (trigger on `auth.users`), filled from the sign-up form.
- The profile email follows the account email if it ever changes. Deleting a user deletes their profile.
- **Row level security:** a signed-in user can read and edit only their own profile, and only the name, institution and job title columns. Visitors who aren't signed in can't read anything. Nobody can insert or delete profiles directly.
- Verified with a rolled-back test transaction, and Supabase's security and performance advisors report no issues.

### App (`web/`)

| Page | What it does |
|---|---|
| `/signup` | Name, institution, email, password (live strength rules), terms checkbox. Shows "confirm your email" with a resend button (60s cooldown). |
| `/login` | Email + password, or a one-time sign-in link. Handles unconfirmed emails (offers resend) and expired links. Returns you to the page you came from (`?next=`). |
| `/forgot-password` | Sends a reset email. Never reveals whether an email has an account. |
| `/reset-password` | Where the reset email lands. Set a new password, then go to the account page. |
| `/account` | Protected. Edit profile, change password, sign out, or sign out of all devices. |

The navbar shows **Sign In** or **Account** depending on session. Sessions persist across reloads and refresh automatically. The Supabase library is lazy-loaded so the landing page stays fast.

Configuration is in `netlify.toml` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`). The publishable key is designed to be public, and row level security protects the data. `public/_redirects` lets Netlify serve `/login`, `/account` and the other pages on direct visits and refreshes.

## What you need to do in the Supabase dashboard

These settings aren't reachable through the tools Claude has, so they need a person in the dashboard: <https://supabase.com/dashboard/project/iwqtoyjzbzulyvkugfar>

### 1. URL configuration (required, or email links will point to the wrong place)

**Authentication → URL Configuration**

- **Site URL:** your Netlify address, e.g. `https://your-site.netlify.app` (or your custom domain).
- **Redirect URLs:** add
  - `https://your-site.netlify.app/**`
  - `http://localhost:5173/**` (local development)
  - your custom domain with `/**`, if you have one

Supabase only redirects to addresses on this list, and otherwise falls back to the Site URL (default `http://localhost:3000`, which won't work).

### 2. Custom SMTP (required before real users sign up)

Supabase's built-in email server is for testing only. **It only delivers to email addresses of members of your Supabase organization**, and it's limited to a few emails per hour. Anyone else who signs up won't get a confirmation email.

**Authentication → Emails → SMTP Settings** → enable custom SMTP using a provider such as Resend, Postmark, SendGrid, Amazon SES or Brevo. You'll need a domain you own to send from (e.g. `no-reply@yourdomain.com`), verified with that provider. After that, raise the email rate limit under **Authentication → Rate Limits**.

Until then, you can test with your own address (the one on your Supabase account).

### 3. Recommended settings

- **Authentication → Sign In / Providers → Email:**
  - Keep **Confirm email** ON (the app handles both states).
  - Keep **Secure email change** ON.
  - Set **Minimum password length** to 8 to match the app's rules. Optionally require letters and digits.
- **Authentication → Attack Protection:** enable **Leaked password protection** (Pro plan) and CAPTCHA if you see bot sign-ups.
- **Authentication → Emails → Templates:** rebrand the Confirm sign-up, Magic Link, Reset Password and Change Email templates with AggregateIQ wording.

## Testing it yourself

1. Do steps 1 and 2 above (or use your own Supabase account email for a quick test with the built-in mailer).
2. Open `/signup` on the live site, create an account, and click the confirmation email.
3. You land on `/account`. Edit your profile, reload (you stay signed in), then sign out.
4. Try `/forgot-password` and the email-link option on `/login`.
5. In Supabase, **Authentication → Users** shows the user, and **Table Editor → profiles** shows their profile row.

## Notes

- Deleting your own account from the app isn't included. It needs a server-side function with the secret service key. For now, delete users in **Authentication → Users**, and their profile row is removed automatically.
- Changing the sign-in email is not exposed in the UI yet. Supabase supports it via a double-confirmation flow if you want it later.
