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

const uri = "mongodb+srv://todos-admin:todos-admin@cluster0.jjq0s.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

  async function run() {
    try {
      await client.connect();
      console.log("Database connected");

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