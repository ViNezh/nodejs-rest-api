const mongoose = require("mongoose");

const app = require("./app");

const { URI_DB, PORT = 5000 } = process.env;

mongoose.set("strictQuery", true);

const connection = mongoose.connect(URI_DB);

connection
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running. Use API on port: ${PORT}`);
});
