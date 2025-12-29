# Environment Variables Configuration

## Local Development
Create a `.env.local` file (not tracked in git):
```
REACT_APP_BACKEND_URL=http://localhost:8080
```

## Production on Render
Set this environment variable in Render's dashboard:
```
REACT_APP_BACKEND_URL=https://rentalreminder.onrender.com
```

The proxy server (server.js) will use this to route /api/* requests to your backend.


