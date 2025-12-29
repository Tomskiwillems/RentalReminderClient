# Deployment Instructions for Render

## Overview
This setup uses a proxy server to eliminate third-party cookie issues. All API requests go through the same domain as the frontend.

## What Changed

### 1. **AuthService.ts**
- Changed from absolute URLs (`http://localhost:8080/api`) to relative paths (`/api`)
- Added `credentials: "include"` to all fetch requests for cookie handling

### 2. **server.js** (NEW)
- Express server that serves the React build and proxies API requests
- Proxies `/api/*` requests to the backend URL
- This runs in production on Render

### 3. **package.json**
- Added `express` and `http-proxy-middleware` as dependencies
- Added `start:prod` script to run the production server

### 4. **setupProxy.js**
- Enhanced for better local development debugging
- Proxies `/api/*` to `localhost:8080` during development

---

## Deployment Steps

### Step 1: Install Dependencies Locally (Optional - to test)
```bash
npm install
```

### Step 2: Configure Render

#### In your Render Dashboard for the Frontend service:

1. **Build Command:**
   ```
   npm install && npm run build
   ```

2. **Start Command:**
   ```
   npm run start:prod
   ```

3. **Environment Variables:**
   Add this environment variable:
   ```
   REACT_APP_BACKEND_URL=https://rentalreminder.onrender.com
   ```
   
   (Replace with your actual backend URL on Render)

### Step 3: Update Backend CORS Configuration

Your backend needs to allow requests from your frontend domain. In your Spring Boot backend, update the CORS configuration to include:

```java
.allowedOrigins(
    "http://localhost:3000",  // Local development
    "https://rentalreminderclient.onrender.com"  // Production
)
.allowCredentials(true)
```

### Step 4: Deploy to Render

1. Commit and push all changes to your repository
2. Render will automatically rebuild and deploy
3. Test the login flow

---

## How It Works

### Local Development (npm start)
```
Browser → http://localhost:3000/api/login
         ↓ (setupProxy.js)
         → http://localhost:8080/api/login
```

### Production (npm run start:prod)
```
Browser → https://rentalreminderclient.onrender.com/api/login
         ↓ (server.js Express proxy)
         → https://rentalreminder.onrender.com/api/login
```

**Key Benefit:** Browsers treat cookies as first-party since they appear to come from the same domain!

---

## Testing Locally (Optional)

To test the production setup locally:

1. Build the app:
   ```bash
   npm run build
   ```

2. Set the backend URL:
   ```bash
   export REACT_APP_BACKEND_URL=http://localhost:8080
   ```

3. Start the production server:
   ```bash
   npm run start:prod
   ```

4. Visit `http://localhost:3000` and test login

---

## Troubleshooting

### If cookies still don't work:

1. **Check browser console** for any errors
2. **Check Network tab** in DevTools:
   - Look at the `/api/login` request
   - Check if `Set-Cookie` header is present in the response
   - Check if cookies are being sent in subsequent requests

3. **Verify backend CORS** allows your frontend origin with credentials

4. **Check Render logs** for proxy errors:
   ```bash
   # The server.js logs will show proxy requests
   ```

### Common Issues:

- **Backend URL wrong:** Check `REACT_APP_BACKEND_URL` in Render dashboard
- **CORS errors:** Backend needs to allow your frontend origin
- **Build fails:** Make sure to run `npm install` in the build command

---

## Environment Variables Summary

| Environment | Variable | Value |
|------------|----------|-------|
| Local Dev | None needed | setupProxy.js handles it |
| Production | `REACT_APP_BACKEND_URL` | `https://rentalreminder.onrender.com` |

---

## Next Steps After Deployment

1. ✅ Deploy frontend with new configuration
2. ✅ Verify backend CORS settings
3. ✅ Test login flow in production
4. ✅ Check browser DevTools to confirm cookies are being set and sent

---

## Files Modified

- `src/services/AuthService.ts` - Use relative paths
- `src/setupProxy.js` - Enhanced logging
- `package.json` - Added dependencies and scripts
- `server.js` - NEW production proxy server
- `ENV_SETUP.md` - NEW environment variable guide
- `DEPLOYMENT.md` - This file

---

**Important:** After these changes, cookies will work because the browser sees all requests as same-origin (coming from the frontend domain), even though they're actually proxied to the backend.

