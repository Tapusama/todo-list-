//server created

var express = require("express"); //express library called
const router = require("./router/router");

//var Employee = require("./model/tasks.js");

var app = express(); //app initialised
require("./dataBase/db");
var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(
    "Hi,this is the first app i am trying to create with node.js, express.js and mongoDb"
  );
});

app.use("/api", router);

app.listen(3000, function () {
  console.log("server is running successfully on port 3000");
});
