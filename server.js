const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Backend API URL from environment variable
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://rentalreminder.onrender.com';

console.log(`Starting production server on port ${PORT}`);
console.log(`Proxying /api/* requests to: ${BACKEND_URL}`);

// Proxy API requests to backend
app.use(
    '/api',
    createProxyMiddleware({
        target: BACKEND_URL,
        changeOrigin: true,
        secure: true,
        onProxyReq: (proxyReq, req, res) => {
            // Log proxy requests for debugging
            console.log(`Proxying: ${req.method} ${req.path} -> ${BACKEND_URL}${req.path}`);
        },
        onProxyRes: (proxyRes, req, res) => {
            // Log response status
            console.log(`Response: ${proxyRes.statusCode} for ${req.path}`);
        },
        onError: (err, req, res) => {
            console.error('Proxy error:', err);
            res.status(500).json({ error: 'Proxy error', message: err.message });
        }
    })
);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing - return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Frontend served from: ${path.join(__dirname, 'build')}`);
});


