# Deployment Guide for ScamScope

This guide will help you deploy ScamScope to production.

## Prerequisites

Before deploying, ensure you have:

- ✅ All features tested locally
- ✅ Environment variables configured
- ✅ Clerk production credentials
- ✅ Convex production deployment
- ✅ OpenAI API key (if using AI features)

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides the best experience for Next.js applications.

#### Steps:

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   
   In Vercel dashboard, add these environment variables:
   
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_key
   CLERK_SECRET_KEY=sk_live_your_key
   NEXT_PUBLIC_CONVEX_URL=https://your-prod.convex.cloud
   OPENAI_API_KEY=sk-your_key
   UPLOADTHING_SECRET=sk_live_your_key
   UPLOADTHING_APP_ID=your_app_id
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at `https://your-project.vercel.app`

5. **Configure Clerk for Production**
   - Go to Clerk dashboard
   - Add your Vercel domain to allowed origins
   - Update redirect URLs

6. **Configure Convex for Production**
   ```bash
   npx convex deploy --prod
   ```
   - Use the production deployment URL in your environment variables

#### Custom Domain (Optional)

1. In Vercel dashboard, go to "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update Clerk allowed origins with custom domain

---

### Option 2: Netlify

#### Steps:

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Environment Variables**: Same as Vercel
4. Configure Clerk and Convex for your Netlify domain

---

### Option 3: Self-Hosted

#### Requirements:
- Node.js 18+ server
- PM2 or similar process manager
- Nginx or Apache for reverse proxy
- SSL certificate (Let's Encrypt)

#### Steps:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start with PM2**
   ```bash
   pm2 start npm --name "scamscope" -- start
   pm2 save
   pm2 startup
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **SSL with Certbot**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

---

## Post-Deployment Checklist

### 1. Test Core Features
- [ ] Homepage loads correctly
- [ ] Search functionality works
- [ ] User authentication (sign up/sign in)
- [ ] Submit scam form works
- [ ] Comments can be posted
- [ ] Voting works
- [ ] Dark mode toggle works
- [ ] Mobile responsive design

### 2. Configure Production Services

**Clerk:**
- [ ] Add production domain to allowed origins
- [ ] Configure redirect URLs
- [ ] Test sign-up flow
- [ ] Test sign-in flow

**Convex:**
- [ ] Production deployment active
- [ ] Database schema up to date
- [ ] Test queries and mutations
- [ ] Monitor for errors

**OpenAI (if applicable):**
- [ ] API key configured
- [ ] Rate limits appropriate for production
- [ ] Error handling in place

### 3. Performance Optimization

- [ ] Enable Next.js Image Optimization
- [ ] Configure caching headers
- [ ] Optimize bundle size
- [ ] Enable compression
- [ ] Configure CDN (Vercel does this automatically)

### 4. Monitoring & Analytics

**Recommended Services:**
- Vercel Analytics (built-in)
- Google Analytics
- Sentry for error tracking
- Convex dashboard for database monitoring

### 5. Security

- [ ] All API keys in environment variables (never in code)
- [ ] HTTPS enabled
- [ ] CSP headers configured
- [ ] Rate limiting on API endpoints
- [ ] Input validation on all forms

---

## Environment Variables Reference

### Required
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=  # Clerk public key
CLERK_SECRET_KEY=                    # Clerk secret key
NEXT_PUBLIC_CONVEX_URL=             # Convex deployment URL
```

### Optional
```env
OPENAI_API_KEY=                     # For AI features
UPLOADTHING_SECRET=                 # For file uploads
UPLOADTHING_APP_ID=                 # For file uploads
```

---

## Troubleshooting

### Build Fails
- Check all environment variables are set
- Verify Node.js version (18+)
- Clear cache: `rm -rf .next node_modules && npm install`

### Authentication Issues
- Verify Clerk domain configuration
- Check redirect URLs
- Ensure API keys are correct

### Database Errors
- Verify Convex deployment is running
- Check deployment URL
- Review Convex dashboard for errors

### Performance Issues
- Enable Next.js production optimizations
- Configure caching
- Use Vercel Analytics to identify bottlenecks

---

## Scaling Considerations

### Database (Convex)
- Convex scales automatically
- Monitor usage in dashboard
- Upgrade plan if needed

### API Rate Limits
- Monitor OpenAI usage
- Implement caching for AI responses
- Consider response caching

### CDN & Edge
- Vercel provides global CDN automatically
- Use Next.js ISR for frequently accessed pages
- Configure proper cache headers

---

## Maintenance

### Regular Tasks
- [ ] Monitor error logs
- [ ] Check database performance
- [ ] Review user feedback
- [ ] Update dependencies monthly
- [ ] Backup configuration

### Updates
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Test thoroughly after updates
npm run build
npm run lint
```

---

## Support

For deployment issues:
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Check Clerk documentation: [clerk.com/docs](https://clerk.com/docs)
- Check Convex documentation: [docs.convex.dev](https://docs.convex.dev)
- Open an issue on GitHub

---

## Production Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Clerk production mode enabled
- [ ] Convex production deployment active
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Error monitoring setup
- [ ] Analytics configured
- [ ] Performance tested
- [ ] Mobile tested
- [ ] Security audit complete
- [ ] Backup strategy in place

**Ready to deploy!** 🚀
