const express = require("express");
const app = express();
require("dotenv").config();
const  cors=require('cors');
const mongodb = require("mongoose");

const dbURI = process.env.DB_URL;
mongodb
  .connect(dbURI)
  .then(() => console.log("db coonection"))
  .catch((err) => console.log(err));

// Middleware for JSON handling
app.use(express.json());
app.use(cors())

const TodoSchema = new mongodb.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});
//model
const tododata = mongodb.model("TODO", TodoSchema);
//get data from database
app.get("/getdata/", async (req, resp) => {
    const alldata = await tododata.find();
    resp.status(201).send(alldata);
  });

// POST method for ToDo application
app.post("/todopost/", async (req, resp) => {
  const { title, description } = req.body;

  const newTodo = new tododata({
    title,
    description,
  });
  try {
    const saveddata = await newTodo.save();
    resp.status(201).send(saveddata);
  } catch (error) {
    resp
      .status(500)
      .send({ error: "Internal server error", details: error.message });
  }
});

//updating data to the database
app.put("/update/:id", async (req,resp )=>
{
    try{
    //get data from body for updation
    const { title, description } = req.body; 
    //get id from request api
    const id=req.params.id.trim();
       const updated= await  tododata.findByIdAndUpdate(
        id,
        {title,description},
        {new:true}//to instantly save the data to the database and will show this resopne as a updated data 
       );
     if (!updated) {
        return resp.status(404).send({ error: "Item not found" });
    }
    resp.status(200).send(updated)
   // console.log(updated)
}
catch (error) {
    resp
      .status(500)
      .send({ error: "Internal server error", details: error.message });
  }
});

//deleteing a todo items
app.delete("/delete/:id", async (req, resp) => {
  const { id } = req.params;

  // Validate ObjectId format
  if (!mongodb.Types.ObjectId.isValid(id)) {
    return resp.status(400).send({ error: "Invalid ID format" });
  }

  try {
    const deletedCategory = await tododata.findByIdAndDelete(id);

    if (!deletedCategory) {
      // Document not found
      return resp.status(404).send({ error: "Category not found" });
    }

    // Document deleted successfully
    resp.status(200).send(deletedCategory)
  } catch (error) {
    // Server-side error handling
    console.error("Error deleting category:", error);
    resp.status(500).send({
      error: "Failed to delete category",
      details: error.message,
    });
  }
});


const port = process.env.Port ||8000
app.listen(port, () => {
  console.log("Server is started on port", port);
});
