# Deployment Guide for Vercel

## Step 1: Create Vercel KV Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on **Storage** tab
3. Click **Create Database**
4. Select **KV** (Redis)
5. Name it: `pastebin-kv` (or any name you prefer)
6. Click **Create**

## Step 2: Connect KV to Your Project

1. After creating the KV database, go to the **Connect** tab
2. Select your project: `pastebin-lite`
3. Click **Connect**
4. Vercel will automatically add the required environment variables:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
   - `KV_URL`

## Step 3: Add Additional Environment Variables (Optional)

1. Go to your project settings: **Settings** → **Environment Variables**
2. Add `NEXT_PUBLIC_BASE_URL` (optional):
   - **Name**: `NEXT_PUBLIC_BASE_URL`
   - **Value**: Your production URL (e.g., `https://pastebin-lite.vercel.app`)
   - **Environment**: Production, Preview, Development
   - Click **Save**

> **Note**: If you don't set `NEXT_PUBLIC_BASE_URL`, the app will automatically use your Vercel deployment URL.

## Step 4: Redeploy

1. Go to **Deployments** tab
2. Click the **⋯** menu on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic deployment

## Troubleshooting

### 404 Error After Deployment

**Cause**: Vercel KV not connected or environment variables missing.

**Solution**: 
- Make sure KV database is created and connected to your project
- Check that environment variables are set in Vercel dashboard
- Redeploy after adding environment variables

### Links Not Working

**Cause**: `NEXT_PUBLIC_BASE_URL` not set correctly.

**Solution**: 
- The app now auto-detects Vercel URL, but you can explicitly set it in environment variables
- Use your actual Vercel domain: `https://your-project.vercel.app`

### Local Development

For local development, the app uses an in-memory store. Data will be lost on server restart.

To use Vercel KV locally:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel env pull .env.local`
3. This downloads your production environment variables
