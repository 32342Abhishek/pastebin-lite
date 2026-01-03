
# Pastebin Lite

A simple pastebin application built with Next.js and Vercel KV.

## Features
- Create text pastes with unique URLs
- Optional TTL (Time To Live) - pastes expire after specified seconds
- Optional view limits - pastes expire after maximum views
- Serverless and scalable

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/32342Abhishek/pastebin-lite)

### Manual Deployment

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com/new)
3. **Create Vercel KV Database**:
   - Go to Storage → Create Database → KV
   - Connect it to your project
4. Deploy!

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## Persistence

- **Production**: Uses Vercel KV (Redis) for persistent storage
- **Development**: Uses in-memory storage (data lost on restart)

## Environment Variables

- `KV_REST_API_URL` - Vercel KV URL (auto-set when you connect KV)
- `KV_REST_API_TOKEN` - Vercel KV token (auto-set when you connect KV)
- `NEXT_PUBLIC_BASE_URL` - Your deployment URL (optional, auto-detected)

## API Endpoints

### Create Paste
```
POST /api/pastes
Body: { content: string, ttl_seconds?: number, max_views?: number }
Response: { id: string, url: string }
```

### Get Paste
```
GET /api/pastes/:id
Response: { content: string, remaining_views: number | null, expires_at: string | null }
```

## Tech Stack

- **Framework**: Next.js 14
- **Database**: Vercel KV (Redis)
- **Deployment**: Vercel
- **Language**: TypeScript
