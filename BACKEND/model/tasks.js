const mongoose = require("mongoose");
const Todoschema = new mongoose.Schema({
  todo: {
    type: Boolean,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
});

module.exports = new mongoose.model("Tasks", Todoschema);
