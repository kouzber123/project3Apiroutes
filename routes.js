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

//routes > actions points
/* Using try catch block to handle errors related to finding correct id 
   Using returns after every request etc. to end the request / call immediately to avoid overloads
*/

//when user inputs bad endpoint
exports.generalMessage = (req, res) => {
  res.status(404).json({
    status: 404,
    msg: "Hello, are you lost? you browsing in wrong endpoint! đ¤Ą consider reading the document!"
  });
};

//get all except when db empty then send
exports.getAllSports = (req, res) => {
  Sport.find({}, (err, result) => {
    if (err) {
      res.status(400).json({
        status: 400,
        msg: "This isnt even possible đ¤Ą you clown"
      });
      return;
    }
    if (result == "") {
      res.status(204).json({
        status: 204,
        msg: "Database is empty, go to the postman and start filling it đ¯"
      });
    } else {
      res.status(200).json({
        status: 200,
        result
      });
      return;
    }
  });
};
exports.search = (req, res) => {
  try {
    Sport.findOne({ title: req.params.title }, (err, result) => {
      if (!result) {
        return res.status(404).json({
          status: 404,
          err,
          msg: "Not found âšī¸"
        });
      } else {
        return res.status(200).json({
          status: 200 + " Ok đ",
          result
        });
      }
    });
  } catch (e) {
    return e;
  }
};

exports.addSport = (req, res) => {
  try {
    //check if url contains title and body
    if (!req.body.title || !req.body.body) {
      res.status(400).json({
        status: 400,
        msg: "Must contain title and content đ đĸ"
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
        msg: "Successfully created đ§",
        sport
      });
      return;
    }
  } catch (error) {
    console.log("Something happened ");
  }
};

exports.getByID = (req, res) => {
  id = req.params.id;

  try {
    Sport.findOne({ _id: id }, (err, result) => {
      if (!result) {
        res.status(404).json({
          status: 404,
          err,
          msg: "Not found âšī¸"
        });
        return;
      } else {
        res.status(200).json({
          status: 200 + " Ok đ",
          result
        });
        return;
      }
    });
  } catch (error) {
    console.log("Get id end point has problems");
  }
};

exports.updateById = (req, res) => {
  const id = req.params.id;

  try {
    Sport.findOneAndUpdate({ _id: id }, { $set: { title: req.body.title, body: req.body.body } }, (err, result) => {
      if (!result) {
        res.status(404).json({
          status: 404,
          msg: "Not found âšī¸",
          err
        });
        return;
      } else if (!req.body.title || !req.body.body) {
        res.status(400).json({
          status: 400,
          msg: "Must contain title and content đ đĸ"
        });
        return;
      } else {
        res.status(200).json({
          status: 200,
          msg: "Updated đ¤",
          result
        });
        return;
      }
    });
  } catch (error) {}
};

exports.deleteById = (req, res) => {
  const id = req.params.id;

  try {
    Sport.findOneAndDelete({ _id: id }, (err, result) => {
      if (!result) {
        res.status(404).json({
          status: 404,
          msg: "Not found âšī¸",
          err
        });
        return;
      } else {
        res.status(202).json({
          status: 202,
          msg: "Accepted and Deleted đŽ",
          result
        });
        return;
      }
    });
  } catch (error) {
    console.log("Something wrong happened on delete by id endpoint");
  }
};
