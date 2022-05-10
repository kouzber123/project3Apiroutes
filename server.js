//tier 1
const dotenv = require("dotenv");
const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
var cors = require("cors");
app.use(cors());
//middlewares
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get("/api/getall", routes.getAllSports);
app.get("/api/sport/title", routes.search);
app.get("/api/:id", routes.getByID);
app.post("/api/add", routes.addSport);
app.put("/api/update/:id", routes.updateById);
app.delete("/api/delete/:id", routes.deleteById);

//end point for all invalid routes
app.get("*", routes.generalMessage);
const port = process.env.PORT;
app.listen(port || 3000, () => {
  console.log("hello 🤣 from port " + port);
});
