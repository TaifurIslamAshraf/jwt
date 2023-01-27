const router = require("express").Router();
const passport = require("passport");

//profile router
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.status(200).send({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
      },
    });
  }
);

module.exports = router;
