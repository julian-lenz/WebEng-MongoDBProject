
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jlenzenweger:sicher123@cluster0.f2fiuzr.mongodb.net/?retryWrites=true&w=majority";

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
        // Send a ping to confirm a successful connection
        await client.db("").command({ ping: 1 });
        //console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
        console.log("schas is aus mit lustig :)")
    }
}
run().catch(console.dir);


const myDB = client.db("myDB");
const myColl = myDB.collection("pizzaMenu");

myColl.createIndex({ "name": 1 }, { unique: true })

const doc = { name: "Neapolitan pizza", shape: "round" };
const docs = [
    { name: "Neapolitan pizza", shape: "round" },
    { name: "Chicago pizza", shape: "square" },
    { name: "New York pizza", shape: "triangle" }
]

//let result = myColl.insertOne(doc);

// CREATE
try {
    const result = myColl.insertMany(docs);
    then((res) => { console.log("Inserted multiple documents", res) }
    )
    console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );
}
catch (e) {
    console.log("Error inserting documents");
    //console.error(e);
}

// READ

try {
    const cursor = myColl.findOne({ shape: "round" })
        .then((res) => { console.log("Found a document with the shape of a round pizza", res) })
        .finally(() => client.close());
    //cursor.forEach(console.dir);
}
catch (e) {
    console.log(e);
}
