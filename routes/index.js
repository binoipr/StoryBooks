const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/checkauth");

const Story = require("../models/Story");

//@desc Login/Landing page
//@router   GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("logView", {
    layout: "login",
  });
});

//@desc Dashboard
//@router   GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render("dashView", { name: req.user.firstName, stories });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
