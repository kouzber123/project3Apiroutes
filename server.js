/*
Create REST API for your app e.g. musci / sports / project db done

create at least 5 routes : done
send response as json, wip
handle errors properly,  wipgit 
send status codes to client 
implement more routes as well (optional) wip

use mongoose in ap db queries done

test with postman  done 

publis to heroku wip

github > comment code  wip
*/

//tier 1
const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/sportApi");
const routes = require("./routes");
const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get("/api/getall", routes.getAllSports);
app.get("/api/:id", routes.getByID);
app.post("/api/add", routes.addSport);
app.put("/api/update/:id", routes.updateById);
app.delete("/api/delete/:id", routes.deleteById);

app.listen(3000, () => {
  console.log("hello from port 3000");
});
