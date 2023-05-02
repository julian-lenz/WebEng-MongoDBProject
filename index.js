
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

const myDB = client.db("myDB");
const myColl = myDB.collection("pizzaMenu");

myColl.createIndex({ "name": 1 }, { unique: true })

const docs = [
    { name: "Neapolitan pizza", shape: "round" },
    { name: "Chicago pizza", shape: "square" },
    { name: "New York pizza", shape: "triangle" }
]

async function create() {
    await myColl.insertMany(docs)
        .then((res) => { console.log("Inserted multiple documents into the collection") })
        .catch((err) => { console.log("Error while inserting multiple documents into the collection", err) })
}

async function findRound() {
    const cursor = await myColl.find({ shape: "round" })
    if (!cursor) { console.log("No document found"); return; }
    //console.log("Found a document with the shape of a round pizza:\n", cursor)
    for await (const doc of cursor) {
        console.log(doc);
    }
}

async function deleteAll() {
    await myColl.deleteMany({})
        .then((res) => { console.log(`Deleted ${res.deletedCount} document(s)`) })
}

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // CREATE
        await create();

        // UPDATE
        await myColl.updateOne(
            { name: "Chicago pizza" },
            {
                $set: { shape: "round" }
            })
            .then((res) => { console.log("Updated document") })
            .catch((err) => { console.log("Error while updating document") })

        // READ
        await findRound();
        // DELETE
        await deleteAll();
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);




