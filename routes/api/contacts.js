const express = require("express");

const { basedir } = global;

const controllers = require(`${basedir}/controllers/contacts`);
const { controllerWrap } = require(`${basedir}/helpers`);

const router = express.Router();

router.get("/", controllerWrap(controllers.get));

router.get("/:id", controllerWrap(controllers.getById));

router.post("/", controllerWrap(controllers.create));

router.put("/:id", controllerWrap(controllers.update));

router.patch("/:id/favorite", controllerWrap(controllers.updateStatus));

router.delete("/:id", controllerWrap(controllers.remove));

module.exports = router;
