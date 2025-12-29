const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:8080",
            changeOrigin: true,
            secure: false,
            onProxyReq: (proxyReq, req, res) => {
                console.log(`[DEV Proxy] ${req.method} ${req.path}`);
            }
        })
    );
};
