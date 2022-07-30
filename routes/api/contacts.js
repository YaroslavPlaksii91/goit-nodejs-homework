const express = require("express");

const { basedir } = global;

const { contacts: ctrl } = require(`${basedir}/controllers`);
const { ctrlWrap } = require(`${basedir}/helpers`);
const { auth } = require(`${basedir}/middlewares`);

const router = express.Router();

router.get("/", auth, ctrlWrap(ctrl.get));

router.get("/:id", auth, ctrlWrap(ctrl.getById));

router.post("/", auth, ctrlWrap(ctrl.create));

router.put("/:id", auth, ctrlWrap(ctrl.update));

router.patch("/:id/favorite", auth, ctrlWrap(ctrl.updateStatus));

router.delete("/:id", auth, ctrlWrap(ctrl.remove));

module.exports = router;
