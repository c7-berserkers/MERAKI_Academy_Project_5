const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("DB READY");
  })
  .catch((err) => {
    console.log(err);
  });
