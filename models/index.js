const { Contact, addSchema, updateFavoriteSchema } = require("./contact");
const {
  User,
  joiAuthSchema,
  updateSubscriptionSchema,
  verifyEmailSchema,
} = require("./user");

module.exports = {
  Contact,
  addSchema,
  updateFavoriteSchema,
  User,
  joiAuthSchema,
  updateSubscriptionSchema,
  verifyEmailSchema,
};
