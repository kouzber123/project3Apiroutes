const mongoose = require("mongoose");

//SCHEMA
const { Schema } = mongoose;
const sportSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  body: {
    type: String,
    required: [true, "Body is required!"],
  },
});

//MODEL
const Sport = mongoose.model("Sport", sportSchema);

const e = () => {
  f = {
    status: 404,
    err,
  };
};

exports.getAllSports = (req, res) => {
  Sport.find({}, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result == "") {
      res.send("Database is empty start filling it 😒");
    } else {
      res.send(result);
    }
  });
};
//routes > actions
exports.addSport = (req, res) => {
  const sport = new Sport({
    title: req.body.title,
    body: req.body.body,
  });
  if (sport.title == "" || sport.body == "") {
    res.status(404).json({
      status: 404,
      msg: "Must contain title and content",
    });
  } else {
    sport.save();
    res.status(201).json({
      status: 201,
      msg: "Successfully created",
      sport,
    });
  }
};

exports.getByID = (req, res) => {
  id = req.params.id;
  Sport.findOne({ _id: id }, (err, result) => {
    if (err) {
      res.status(404).json({
        status: 404,
        err,
        msg: "Not found ☹️",
      });
    }
    res.status(200).json({
      status: 200 + " Ok 👌",
      result,
    });
  });
};

exports.updateById = (req, res) => {
  const id = req.params.id;
  Sport.findOneAndUpdate(
    { _id: id },
    { $set: { title: req.body.title, body: req.body.body } },
    (err, result) => {
      if (err) {
        res.status(404).json({
          status: 404,
          msg: "Not found ☹️",
          err,
        });
      } else {
        res.status(200).json({
          status: 200,
          msg: "Updated 🤌",
        });
      }
    }
  );
};

exports.deleteById = (req, res) => {
  const id = req.params.id;
  Sport.findOneAndDelete({ _id: id }, (err, result) => {
    if (err) {
      res.send({
        status: 404,
        msg: "Not found ☹️",
        err,
      });
    }
    res.status(200).json({
      status: 200,
      msg: "Deleted 🤌",
    });
  });
};
