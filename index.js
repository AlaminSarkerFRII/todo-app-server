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
      // const completeCollection = client.db("todos").collection("todocompletes");

      app.post("/todos",async(req,res)=>{
        const data= req.body
        const result = await todoCollection.insertOne(data)
        res.send(result);
      })
      app.get("/todos",async(req,res)=>{
        const result = await todoCollection.find().toArray()
        res.send(result);
      })
    //   // ====Add Complete ToDo======
		//  app.post('/complete', async (req, res) => {
    //   const complete = req.body;
    //   const result = await completeCollection.insertOne(complete);
    //   res.send(result);
    // });

    // // ====Get Complete ToDo======
    // app.get('/complete', async (req, res) => {
    //   const query = {};
    //   const cursor = completeCollection.find(query);
    //   const completes = await cursor.toArray();
    //   res.send(completes);
    // });

    // update

    app.put("/todos/:id",async(req,res)=>{
      // const completed = req.body.isComplete;
      const id = req.params.id;
      const result = await todoCollection.updateOne({_id:ObjectId(id)},{$set:{isComplete:true}},{upsert:true})
      res.send(result);
    })

    // ======delete=========

    app.delete("/todos/:id",async(req,res)=>{
      const id = req.params.id;
      const result = await todoCollection.deleteOne({_id:ObjectId(id)})
      res.send(result);
    })

    app.get("/complete-todos",async(req,res)=>{
      const result = await todoCollection.find({isComplete:true}).toArray()
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