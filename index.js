const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const port = process.env.PORT || 8000;

app.use(cors())
app.use(express.json())




var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-8pabrgd-shard-00-00.q1kedym.mongodb.net:27017,ac-8pabrgd-shard-00-01.q1kedym.mongodb.net:27017,ac-8pabrgd-shard-00-02.q1kedym.mongodb.net:27017/?ssl=true&replicaSet=atlas-uqgq0w-shard-0&authSource=admin&retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const menus = client.db('bistroDB').collection('menu')
        const reviews = client.db('bistroDB').collection('reviews')

        app.get('/menu', async (req, res) => {
            const cursor = menus.find()
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/reviews', async (req, res) => {
            const cursor = reviews.find()
            const result = await cursor.toArray()
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello From Bistro')
})

app.listen(port, () => {
    console.log(`Bistro Boss is running ${port}`);
})