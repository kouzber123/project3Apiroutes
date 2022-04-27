/*
Create REST API for your app e.g.  sports / project db done

create at least 5 routes : done
send response as json, done
handle errors properly,  done
send status codes to client  done
implement more routes as well (optional) wip

use mongoose in ap db queries done

test with postman  done 

publis to heroku ....soon

github > comment code  wip
*/

//tier 1
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();

//middlewares
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get("/api/getall", routes.getAllSports);
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
