const Todoschema = require("../model/tasks.js");

exports.create = async (req, res) => {
  try {
    const todoObj = {
      todo: req.body.todo,
      done: req.body.done,
    };

    var todo = await Todoschema(todoObj);

    await todo
      .save()
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    console.log("error");
  }
};

exports.getdata = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Todoschema.findById(id)

    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found todo with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving todo with id=" + id });
    });
};
