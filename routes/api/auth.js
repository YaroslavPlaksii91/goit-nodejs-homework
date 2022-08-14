const express = require("express");

const { basedir } = global;

const { auth: ctrl } = require(`${basedir}/controllers`);
const { ctrlWrap } = require(`${basedir}/helpers`);
const { auth, upload } = require(`${basedir}/middlewares`);

const router = express.Router();

router.post("/signup", ctrlWrap(ctrl.signup));

router.get("/verify/:verificationToken", ctrlWrap(ctrl.verifyEmail));

router.post("/verify", ctrlWrap(ctrl.reVerification));

router.post("/login", ctrlWrap(ctrl.login));

router.get("/current", auth, ctrlWrap(ctrl.getCurrent));

router.patch("/subscription", auth, ctrlWrap(ctrl.updateSubscription));

router.get("/logout", auth, ctrlWrap(ctrl.logout));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrap(ctrl.updateAvatar)
);

module.exports = router;
