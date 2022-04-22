const express = require("express");
const router = express.Router();
const todoController = require("../controller/controller");

router.post("/add", todoController.create);

router.get("/getdata/:id", todoController.getdata);

module.exports = router;
