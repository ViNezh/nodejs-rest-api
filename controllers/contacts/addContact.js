const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = (await Contact.create({ ...req.body, owner })).populate(
    "owner",
    "name email"
  );
  res.status(201).json(newContact);
};

module.exports = add;
