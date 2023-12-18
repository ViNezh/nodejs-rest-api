const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { name } = req.body;
  const checkName = await Contact.findOne({ name });
  if (checkName) {
    throw HttpError(409, "Contact with same name already exist");
  }
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

module.exports = add;
