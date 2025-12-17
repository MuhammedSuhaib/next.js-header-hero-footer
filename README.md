# Next.js with Better Auth and NeonDB

This repository demonstrates how to set up user authentication using [Better Auth](https://www.better-auth.com/) with [NeonDB](https://neon.tech/) as the PostgreSQL database provider in a Next.js application, without using any ORM.

## Overview

This project implements a complete authentication system with:
- Email/password authentication
- Session management
- Database integration with NeonDB
- Client-side authentication components
- API routes for authentication endpoints

## Features

- ✅ User Registration
- ✅ User Login
- ✅ User Logout
- ✅ Session Management
- ✅ Secure credentials storage
- ✅ PostgreSQL database integration

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: Better Auth
- **Database**: NeonDB (PostgreSQL)
- **Runtime**: Node.js
- **Styling**: CSS Modules

## Prerequisites

Before getting started, ensure you have:

- Node.js v18 or higher
- A NeonDB account (for PostgreSQL database)
- A Next.js project set up

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/next.js-header-hero-footer.git
cd next.js-header-hero-footer
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in your project root directory with the following variables:

```env
DATABASE_URL="your_neon_db_connection_string"
BETTER_AUTH_SECRET="your_super_secret_key_here"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
```

#### Getting Your Environment Values:

1. **DATABASE_URL**: 
   - Sign up at [Neon](https://console.neon.tech/)
   - Create a new project
   - Copy the connection string from your project dashboard

2. **BETTER_AUTH_SECRET**: 
   - Generate a secure random string (32+ characters)
   - You can use: `openssl rand -base64 32` in terminal

3. **NEXT_PUBLIC_BETTER_AUTH_URL**: 
   - Set to your application's URL
   - For development: `http://localhost:3000`
   - For production: your domain URL

## Database Setup

Better Auth handles schema creation automatically. When you first run the application, it will create all necessary tables in your NeonDB database.

## Project Structure

```
app/
├── api/
│   └── auth/
│       └── [...betterauth]/
│           └── route.ts          # Authentication API routes
├── lib/
│   ├── auth.ts                   # Better Auth server instance
│   └── db.ts                     # Alternative database config
├── Components/
│   └── Header.tsx               # Authentication UI component
├── layout.tsx                   # Root layout
├── page.tsx                     # Home page
└── globals.css                  # Global styles
```

## Key Files Explained

### 1. Server-Side Auth Configuration (`app/lib/db.ts`)

```typescript
import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  emailAndPassword: { enabled: true }, // Enable email/password auth
  database: {
    type: "postgres",
    pool,
  },
});
```

This file creates the Better Auth instance with:
- Email/password authentication enabled
- PostgreSQL connection pooling using node-postgres (pg) driver
- Secret key for JWT signing
- Connection to NeonDB via connection string

### 2. Alternative Server-Side Auth Configuration (`app/lib/auth.ts`)

```typescript
import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET!,
    emailAndPassword: { enabled: true },
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
});
```

This alternative approach configures the database connection directly with the pool instance.

### 3. API Routes (`app/api/auth/[...betterauth]/route.ts`)

```typescript
import { auth } from './../../../lib/auth';
// export const runtime = "nodejs"; // IMPORTANT

export const GET = auth.handler;
export const POST = auth.handler;
```

This file creates catch-all routes to handle all Better Auth API endpoints:
- `/api/auth/sign-in`
- `/api/auth/sign-up` 
- `/api/auth/session`
- `/api/auth/logout`

### 4. Client-Side Authentication (`app/Components/Header.tsx`)

This component demonstrates how to use Better Auth client-side:
- Creating an auth client instance
- Handling sign up, sign in, and sign out operations
- Managing form states and error handling
- Providing user feedback with success/error messages

## Running the Application

### Development Mode

```bash
npm run dev
```

Visit `http://localhost:3000` to see your authentication page.

### Production Build

```bash
npm run build
npm start
```

## Configuration Options

You can customize Better Auth by modifying `app/lib/auth.ts` or `app/lib/db.ts`:

```typescript
export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET!,
    
    // Email/password authentication
    emailAndPassword: { 
        enabled: true,
        requireEmailVerification: false // Set to true for email verification
    },
    
    // Session configuration
    session: {
        expiresIn: 7 * 24 * 60 * 60, // 7 days
        updateAge: 24 * 60 * 60      // Update session every 24 hours
    },
    
    // Database configuration
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
    
    // Advanced options
    advanced: {
        user: {
            // Customize user model fields
        },
        session: {
            // Customize session model fields  
        }
    }
});
```

## API Endpoints

After setup, the following endpoints will be available:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/sign-in` | User login |
| POST | `/api/auth/sign-up` | User registration |
| POST | `/api/auth/sign-out` | User logout |
| GET | `/api/auth/session` | Get current session |

## Troubleshooting

### Common Issues:

1. **Database Connection Errors**:
   - Verify your `DATABASE_URL` is correct
   - Check that your NeonDB project is active
   - Ensure your IP isn't blocked by firewall rules

2. **Secret Key Issues**:
   - Ensure `BETTER_AUTH_SECRET` is consistent across deployments
   - Use the same secret key in all environments

3. **Session Problems**:
   - Verify `NEXT_PUBLIC_BETTER_AUTH_URL` matches your domain
   - Check that cookies are being set properly

### Debugging Tips:

- Add logging to see what data is being sent/received
- Check browser's Network tab for API response details
- Monitor server logs for any error messages

## Next Steps

Once you have authentication working, consider adding:

- Password reset functionality
- Email verification
- User profile management
- Social login providers
- Role-based access control
- Protected routes and middleware

## Security Notes

- Never commit `.env` files to version control
- Use strong, unique values for `BETTER_AUTH_SECRET`
- Rotate secrets regularly in production
- Use HTTPS in production to secure cookie transmission

## Deployment

### Deploying to Vercel

1. Push your code to a Git repository
2. Connect to [Vercel](https://vercel.com)
3. Add the environment variables in Vercel dashboard
4. Deploy!

### Environment Variables in Production

Set these environment variables in your hosting platform:

```env
DATABASE_URL="production_neon_db_connection"
BETTER_AUTH_SECRET="production_secret_key"
NEXT_PUBLIC_BETTER_AUTH_URL="https://yourdomain.com"
```

## Contributing

Feel free to submit issues or pull requests if you find bugs or have suggestions for improvements.

## License

MIT