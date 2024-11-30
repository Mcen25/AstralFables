const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Google auth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET);
    res.redirect(`http://localhost:3000/login?token=${token}`);
  }
);

// Microsoft auth
router.get("/microsoft", passport.authenticate("microsoft"));

router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET);
    res.redirect(`http://localhost:3000/login?token=${token}`);
  }
);

// GitHub Auth
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET);
    res.redirect(`http://localhost:3000/login?token=${token}`);
  }
);

// Discord Auth
router.get(
  "/discord",
  passport.authenticate("discord", {
    scope: ["identify", "email"],
  })
);

router.get(
  "/discord/callback",
  passport.authenticate("discord", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET);
    res.redirect(`http://localhost:3000/login?token=${token}`);
  }
);

module.exports = router;
