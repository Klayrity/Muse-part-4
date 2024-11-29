const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { MongoClient, ServerApiVersion } = require('mongodb');
const username = "Klayr";
const password = "vhMUlGALi0macfLH";
const uri = `mongodb+srv://${username}:${password}@cluster0.pehau.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");


    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    //insert data
    // await client.db("{database name}").collection("{collection name}").insertMany({json object});
    // can also add one at a time, look at https://www.mongodb.com/docs/atlas/tutorial/insert-data-into-your-cluster/
    // and the other getting started pages
    /*const DJ_Recruits = [{
        "id": 'DJ_WinterWorld',
        "FirstName": 'Doe',
        "LastName": 'Johnson',
        "Email": 'djww@muse.radio',
        "Phone": '555-555-5555',
        "DateOfBirth": '2024-11-26',
        "Bio": "DJ looking for musical thrills, cowabunga dudes.",
        "Avatar": "NONE",
        "StageName": 'Winter World',
        "Schedule": [],
        "DJStatus": 'online',
        "Subscribers": [],
        "DiscoveredSongs": [],
        "PastEvents": [],
        "userid": 'user_2',
        "Playlists": []
    },
    {
        "id": 'DJ_kolydascope',
        "FirstName": 'Lilly',
        "LastName": 'Flower',
        "Email": 'djkoly@muse.radio',
        "Phone": '555-555-5555',
        "DateOfBirth": '2024-11-27',
        "Bio": "Stopping to smell the musical roses.",
        "Avatar": "NONE",
        "StageName": 'Kolydascope',
        "Schedule": [],
        "DJStatus": 'online',
        "Subscribers": [],
        "DiscoveredSongs": [],
        "PastEvents": [],
        "userid": 'user_3',
        "Playlists": []
    }
    ]*/
    //const result = await client.db("432gp-db").collection("dj_profiles").insertMany(DJ_Recruits);
    //result.databases.forEach(file => console.log(file));
    
    const result2 = await client.db("432gp-db").collection("dj_profiles").find({}).toArray();
    //await client.db("432gp-db").collection("dj_profiles").deleteOne({_id:result2[1]._id});
    console.log(result2);
    
    //result2[0].Playlists=[];
    //const result3 = await client.db("432gp-db").collection("dj_profiles").updateOne({_id:result2[0]._id},{$set:{Playlists:[]}});
    //console.log(result3);
    app.get('/djlist', async (req,res) => {
        const result2 = await client.db("432gp-db").collection("dj_profiles").find({}).toArray();
        //await client.db("432gp-db").collection("dj_profiles").deleteOne({_id:result2[1]._id});
        console.log(result2);
    });
    //app.get('/addPlaylist', async (req,res) => {
    //    const {newPlaylistName} = req.query;
    //    console.log(newPlaylistName);
    //});


    //query data
    // const result = await client.db("{database name}").collection("{collection name}").find("{field name}"); 
    // result is the value of the field (as json)

    //for nested fields
    // const result = await client.db("{database name}").collection("{collection name}").find({ "{field}": "{value}" });
    // can also find just one, other helpful info https://www.mongodb.com/docs/manual/reference/method/js-collection/

    //removing data
    // see https://www.mongodb.com/docs/manual/reference/delete-methods/
    // very much the same as the rest

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

app.listen(8080, () => {
  console.log("Example express file server listening on port 8088");
});

run().catch(console.dir);