# Quick Deployment Checklist for Render

## ✅ Files Changed (Ready to Commit)
- ✅ `src/services/AuthService.ts` - Now uses relative paths
- ✅ `server.js` - NEW production proxy server
- ✅ `package.json` - Added Express dependencies
- ✅ `src/setupProxy.js` - Enhanced for development

## 🚀 Render Configuration

### Frontend Service Settings:

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
npm run start:prod
```

**Environment Variable to Add:**
```
REACT_APP_BACKEND_URL=https://rentalreminder.onrender.com
```

### Backend Service:
Make sure CORS allows your frontend:
```
https://rentalreminderclient.onrender.com
```

## 📝 Deployment Steps:

1. **Commit and push all changes**
   ```bash
   git add .
   git commit -m "Add proxy server for production cookie handling"
   git push
   ```

2. **Update Render Frontend Service:**
   - Go to Render Dashboard → Your Frontend Service
   - Settings → Build & Deploy
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`
   - Environment → Add Variable:
     - Key: `REACT_APP_BACKEND_URL`
     - Value: `https://rentalreminder.onrender.com`
   - Save Changes
   - Manual Deploy → Deploy latest commit

3. **Verify Backend CORS** (use the prompt in your backend project)

4. **Test Login Flow**
   - Visit your frontend URL
   - Try logging in
   - Check browser DevTools → Application → Cookies
   - Cookie should now be set! 🎉

## 🔍 Troubleshooting

**If login still fails:**
- Check Render logs for proxy errors
- Verify `REACT_APP_BACKEND_URL` is correct
- Confirm backend CORS includes your frontend URL
- Check browser console for errors

**To test locally before deploying:**
```bash
npm run build
export REACT_APP_BACKEND_URL=http://localhost:8080
npm run start:prod
```

## ❓ Why This Works

**Before:** 
- Frontend: `rentalreminderclient.onrender.com`
- Backend: `rentalreminder.onrender.com`
- Browser: "These are different domains! Block cookies!" 🚫

**After:**
- Browser requests: `rentalreminderclient.onrender.com/api/login`
- Express proxy forwards to: `rentalreminder.onrender.com/api/login`
- Browser: "Same domain! Accept cookies!" ✅

The proxy makes it appear as same-origin to the browser!

