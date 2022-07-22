const { basedir } = global;

const service = require(`${basedir}/services/contact`);

const get = async (_, res) => {
  const contacts = await service.getAllContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

module.exports = get;
