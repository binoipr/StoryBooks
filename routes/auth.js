const express = require("express");
const { relativeTimeRounding } = require("moment");
const router = express.Router();
const passport = require("passport");

//@desc Auth with google
//@route GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//@desc Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
