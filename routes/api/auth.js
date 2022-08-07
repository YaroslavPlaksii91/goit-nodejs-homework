const express = require("express");

const { basedir } = global;

const { auth: ctrl } = require(`${basedir}/controllers`);
const { ctrlWrap } = require(`${basedir}/helpers`);
const { auth, upload } = require(`${basedir}/middlewares`);

const router = express.Router();

router.post("/signup", ctrlWrap(ctrl.signup));

router.post("/login", ctrlWrap(ctrl.login));

router.get("/current", auth, ctrlWrap(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrap(ctrl.logout));

router.patch("/subscription", auth, ctrlWrap(ctrl.updateSubscription));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrap(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrap(ctrl.verifyEmail));

router.post("/verify", ctrlWrap(ctrl.reVerification));

module.exports = router;
