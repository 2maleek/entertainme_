const express = require("express");
const app = express();
const port = process.env.PORT || 3003;
const mongo = require("./config/config");

mongo.connect(function(err) {
  if (!err) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(require("cors")());
    app.use("/", require("./routes"));

    app.listen(port, () => {
      console.log("Listening on PORT: " + port);
    });
  } else {
    console.log(err);
  }
});
