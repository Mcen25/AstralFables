// server/src/server.js
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
require("./config/passport");

const app = express();

const serverDir = __dirname;
const projectRoot = path.resolve(__dirname, "../../");
const clientDistPath = path.join(projectRoot, "client/dist");
const indexPath = path.join(clientDistPath, "index.html");

console.log("Current directory:", process.cwd());
console.log("Server directory:", serverDir);
console.log("Project root:", projectRoot);
console.log("Looking for client dist at:", clientDistPath);
console.log("Looking for index.html at:", indexPath);

if (!fs.existsSync(clientDistPath)) {
  console.error(`Error: ${clientDistPath} not found!`);
  process.exit(1);
}

if (!fs.existsSync(indexPath)) {
  console.error(`Error: ${indexPath} not found!`);
  process.exit(1);
}

if (!fs.existsSync(clientDistPath) || !fs.existsSync(indexPath)) {
  console.error("Error: client/dist directory or index.html not found!");
  console.log("Please build the client app first:");
  console.log("cd client && npm run build");
  process.exit(1);
}

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(passport.initialize());

// Serve static files
app.use(express.static(clientDistPath));

// API routes
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to AstralFables API",
    endpoints: {
      auth: "/auth",
      test: "/test",
    },
  });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running" });
});

// Auth routes
app.use("/auth", require("./routes/auth"));

// Serve SolidJS app
app.get("*", (req, res, next) => {
  try {
    res.sendFile(indexPath);
  } catch (error) {
    next(error);
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Client app serving from ${clientDistPath}`);
});
