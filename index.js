const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const { query } = require("express");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// mongodb server

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jjq0s.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

  async function run() {
    try {
      await client.connect();
      console.log("Database connected");
      const todoCollection = client.db("todos").collection("todos-list");

      app.post("/todos",async(req,res)=>{
        const data= req.body
        const result = await todoCollection.insertOne(data)
        res.send(result);
      })
      app.get("/todos",async(req,res)=>{
        const result = await todoCollection.find().toArray()
        res.send(result);
      })


    } finally {
   
    }
  }
  run().catch(console.dir);



// server
app.get("/", (req, res) => {
  res.send("server");
});

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});