const express = require("express");

const controllers = require("../../controllers/contacts");
const { controllerWrap } = require("../../helpers");

const router = express.Router();

router.get("/", controllerWrap(controllers.getAllContacts));

router.get("/:id", controllerWrap(controllers.getContactById));

router.post("/", controllerWrap(controllers.addContact));

router.put("/:id", controllerWrap(controllers.updateContact));

router.delete("/:id", controllerWrap(controllers.removeContact));

module.exports = router;
