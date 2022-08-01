const { basedir } = global;

const { contact: service } = require(`${basedir}/services`);

const get = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await service.getAllContacts({ owner }, "", {
    skip,
    limit: Number(limit),
  });

  if (favorite !== undefined) {
    const favoriteContacts = await service.getAllContacts(
      { owner, favorite },
      "",
      {
        skip,
        limit: Number(limit),
      }
    );
    res.json({
      status: "success",
      code: 200,
      data: {
        favoriteContacts,
      },
    });
    return;
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

module.exports = get;
