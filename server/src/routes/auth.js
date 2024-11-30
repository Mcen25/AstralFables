const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Google Auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET);
    res.redirect(`http://localhost:3000/login?token=${token}`);
  }
);

// Microsoft Auth
router.get(
  "/microsoft",
  passport.authenticate("microsoft", { scope: ["user.read"] })
);

// GitHub Auth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// Discord Auth
router.get(
  "/discord",
  passport.authenticate("discord", { scope: ["identify", "email"] })
);

module.exports = router;
