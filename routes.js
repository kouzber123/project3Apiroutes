const mongoose = require("mongoose");

//SCHEMA
const { Schema } = mongoose;
const sportSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required!"]
  },
  body: {
    type: String,
    required: [true, "Body is required!"]
  }
});

//MODEL
const Sport = mongoose.model("Sport", sportSchema);

//routes > actions
exports.generalMessage = (req, res) => {
  res.send("Welcome to the sports api app, unfortunately you are in a wrong route use /api/{endpoints}");
  window.prompt("Hello you are in a wrong route!");
};

exports.getAllSports = (req, res) => {
  Sport.find({}, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    if (result == "") {
      res.send("Database is empty start filling it 😒");
    } else {
      res.send(result);
      return;
    }
  });
};

exports.addSport = (req, res) => {
  try {
    //check if url contains title and body
    if (!req.body.title || !req.body.body) {
      res.status(404).json({
        status: 404,
        msg: "Must contain title and content"
      });
      return;
    } else {
      const sport = new Sport({
        title: req.body.title,
        body: req.body.body
      });
      sport.save();
      res.status(201).json({
        status: 201,
        msg: "Successfully created 🧚",
        sport
      });
      return;
    }
  } catch (error) {
    console.log("Something happened");
  }
};

exports.getByID = (req, res) => {
  id = req.params.id;
  Sport.findOne({ _id: id }, (err, result) => {
    if (err) {
      res.status(404).json({
        status: 404,
        err,
        msg: "Not found ☹️"
      });
      return;
    }
    res.status(200).json({
      status: 200 + " Ok 👌",
      result
    });
    return;
  });
};

exports.updateById = (req, res) => {
  const id = req.params.id;
  Sport.findOneAndUpdate({ _id: id }, { $set: { title: req.body.title, body: req.body.body } }, (err, result) => {
    if (err) {
      res.status(404).json({
        status: 404,
        msg: "Not found ☹️",
        err
      });
      return;
    } else {
      res.status(200).json({
        status: 200,
        msg: "Updated 🤌"
      });
      return;
    }
  });
};

exports.deleteById = (req, res) => {
  const id = req.params.id;
  Sport.findOneAndDelete({ _id: id }, (err, result) => {
    if (err) {
      res.status(404).json({
        status: 404,
        msg: "Not found ☹️",
        err
      });
      return;
    }
    res.status(200).json({
      status: 200,
      msg: "Deleted 🚮"
    });
    return;
  });
};
