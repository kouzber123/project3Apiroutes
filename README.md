# project3Apiroutes
creating api routes with mongoose, js and express

# IMPORTANT THIS IS THE STARTING URL
https://hidden-cliffs-40709.herokuapp.com/

# these are the end points
to access data use the following endpoints :
1. api/getall
2. api/{insert _id} 
3. api/add  ---------- use postman > post and choose body :
# {
# "title": "add title",
#  "body": "add content"
# }
4. api/update/{insert _id} ------ do the same as in the above example use the body
5. api/delete/{insert_id}

#EXAMPLE 
https://hidden-cliffs-40709.herokuapp.com/api/getall

app.get("/api/getall");
app.get("/api/:id");
app.post("/api/add");
app.put("/api/update/:id");
app.delete("/api/delete/:id");

this routes handles the invalid endpoints
app.get("*");
