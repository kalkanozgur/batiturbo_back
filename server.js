const express = require("express");
const app = express();
const db = require("./app/models");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to BATI TURBO ERP application." });
});

require("./app/routes/customer.routes")(app);
require("./app/routes/job.routes")(app);
require("./app/routes/task.routes")(app);
require("./app/routes/turbo.routes")(app);
require("./app/routes/user.routes")(app);


// TODO payment joba gitmiyor
// TODO task joba gitmiyo
// TODO turbo desci saçma sapan

db.sequelize.sync(
    //  db siler
    // { force: true }).then(() => {
    //   console.log("Drop and re-sync db.");
    // }
    ).then(() => {
    app.listen(PORT, () => {
        console.log("listening at: http://localhost:"+ PORT)
    });
});