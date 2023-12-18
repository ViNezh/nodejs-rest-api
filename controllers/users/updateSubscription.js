const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const validSubscription = ["starter", "pro", "business"];
  if (!validSubscription.includes(subscription)) {
    throw HttpError(400, "Invalid subscription value");
  }
  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  res.status(200).json({
    user: {
      name: user.name,
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = updateSubscription;
