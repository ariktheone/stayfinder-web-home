
# Deployment Guide - Vercel 🚀

This guide will walk you through deploying StayFinder to Vercel step by step.

## Prerequisites

- A [Vercel](https://vercel.com) account
- A [Supabase](https://supabase.com) project set up
- [Stripe](https://stripe.com) account (for payments)
- [Mapbox](https://mapbox.com) account (for maps)

## Step 1: Prepare Your Repository

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Vite project
5. Click "Deploy"

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Deploy to production**:
   ```bash
   vercel --prod
   ```

## Step 3: Configure Environment Variables

In your Vercel project dashboard, go to Settings > Environment Variables and add:

### Required Variables
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Optional Variables (for full functionality)
- `VITE_MAPBOX_ACCESS_TOKEN` - Your Mapbox access token
- `VITE_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key

### How to get these values:

#### Supabase Variables
1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings > API
4. Copy the Project URL and anon public key

#### Mapbox Token
1. Go to [Mapbox Account](https://account.mapbox.com)
2. Create a new access token or use the default public token

#### Stripe Key
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to Developers > API keys
3. Copy the Publishable key (starts with `pk_`)

## Step 4: Configure Supabase Edge Functions

1. **Install Supabase CLI**:
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**:
   ```bash
   supabase login
   ```

3. **Link your project**:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

4. **Deploy edge functions**:
   ```bash
   supabase functions deploy create-payment-intent
   supabase functions deploy confirm-payment
   ```

5. **Set Stripe secret in Supabase**:
   - Go to your Supabase Dashboard
   - Navigate to Settings > Edge Functions
   - Add `STRIPE_SECRET_KEY` with your Stripe secret key

## Step 5: Update Domain Settings

### For Stripe Webhooks
1. Go to Stripe Dashboard > Developers > Webhooks
2. Add your Vercel domain as an endpoint:
   ```
   https://your-app.vercel.app/api/stripe/webhook
   ```

### For OAuth Providers (if using social login)
Update your OAuth app settings with your new Vercel domain:
- Google: Add to authorized origins
- GitHub: Update callback URLs

## Step 6: Test Your Deployment

1. Visit your Vercel app URL
2. Test key functionality:
   - User registration/login
   - Property browsing
   - Map functionality
   - Payment flow (use Stripe test cards)

## Step 7: Custom Domain (Optional)

1. In Vercel dashboard, go to Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Update OAuth redirect URLs if needed

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check for TypeScript errors
   - Ensure all dependencies are in package.json
   - Verify environment variables are set

2. **API Calls Fail**
   - Verify Supabase URL and key are correct
   - Check if edge functions are deployed
   - Ensure CORS is properly configured

3. **Maps Don't Load**
   - Verify Mapbox token is set
   - Check browser console for errors
   - Ensure token has proper permissions

4. **Payments Don't Work**
   - Verify Stripe keys are correct
   - Check if webhooks are configured
   - Ensure edge functions have Stripe secret

### Performance Optimization

1. **Enable Analytics**:
   ```bash
   vercel analytics
   ```

2. **Configure Caching**:
   - Static assets are automatically cached
   - API responses can be cached via headers

3. **Monitor Performance**:
   - Use Vercel's built-in analytics
   - Set up error tracking with Sentry

## Production Checklist

- [ ] All environment variables configured
- [ ] Supabase edge functions deployed
- [ ] Stripe webhooks configured
- [ ] OAuth apps updated with production URLs
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Performance monitoring enabled
- [ ] Error tracking configured

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review Supabase function logs
3. Check browser console for client-side errors
4. Refer to the main README for troubleshooting

---

**Happy Deploying! 🎉**
