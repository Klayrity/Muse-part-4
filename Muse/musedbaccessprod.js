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
/*
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
    /*
    //const result = await client.db("432gp-db").collection("dj_profiles").insertMany(DJ_Recruits);
    //result.databases.forEach(file => console.log(file));
    
    const result2 = await client.db("432gp-db").collection("dj_profiles").find({}).toArray();
    //await client.db("432gp-db").collection("dj_profiles").deleteOne({_id:result2[1]._id});
    console.log(result2);
    
    //result2[0].Playlists=[];
    //const result3 = await client.db("432gp-db").collection("dj_profiles").updateOne({_id:result2[0]._id},{$set:{Playlists:[]}});
    //console.log(result3);
    
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
}*/

app.use(express.static('public'))
app.get('/', async (req,res) =>{
  res.status(200).sendFile('/public/index.html');
});
app.get('/djlist', async (req,res) => {
  await client.connect();
  const result2 = await client.db("432gp-db").collection("dj_profiles").find({}).toArray();
  //console.log(await client.db("432gp-db").collection("event_playlists").find({}).toArray());
  //await client.db("432gp-db").collection("dj_profiles").updateOne({_id:result2[0]._id},{$set:{Playlists:['playlist_1','playlist_2']}});
  //await client.db("432gp-db").collection("dj_profiles").deleteOne({_id:result2[1]._id});
  //console.log(result2);
  //await client.close();
  res.status(200).json({info:result2});
});
app.get('/soID', async (req,res) =>{
  await client.connect();
  const result = await client.db("432gp-db").collection("song_library").find({}).toArray();
  //console.log(result);
  //await client.close();
  maxnum = 0;
  for (const song of result){
    let temp = parseInt(song.songid.replace('song_',''), 10);
    if (temp>maxnum){maxnum=temp;}
  }
  res.status(200).json({soID:maxnum});
});
app.get('/plID', async (req,res) =>{
  await client.connect();
  const result = await client.db("432gp-db").collection("event_playlists").find({}).toArray();
  //console.log(result);
  //await client.close();
  maxnum = 0;
  for (const song of result){
    let temp = parseInt(song.playlist_id.replace('playlist_',''), 10);
    if (temp>maxnum){maxnum=temp;}
  }
  res.status(200).json({plID:maxnum});
});

app.get('/getPL/:plid', async (req,res) =>{
  await client.connect();
  const {plid} = req.params;
  //console.log(plid);
  const result = await client.db("432gp-db").collection("event_playlists").find({playlist_id : plid}).toArray();
  res.status(200).json({playlist:result[0]});
});
app.get('/getSong/:soid', async (req,res) =>{
  await client.connect();
  const {soid} = req.params;
  //console.log(soid);
  const result = await client.db("432gp-db").collection("song_library").find({songid : soid}).toArray();
  res.status(200).json({song:result[0]});
});
app.get('/addsong/:title/:artist/:album/:soid/:plname', async (req,res) =>{
  await client.connect();
  const{title} = req.params;
  const{artist} = req.params;
  const {album} = req.params;
  const {soid} = req.params;
  const {plname} = req.params;
  let newsong = [{
    "songid" : soid,
    "title" : title,
    "artist" : artist,
    "album" : album,
    "release_year" : "unknown",
    "runtime":"05:00",
    "source":"not in db",
    "description":"none provided",
    "cover":"none"
  }]
  
  await client.db("432gp-db").collection("song_library").insertMany(newsong);
  const result2 = await client.db("432gp-db").collection("event_playlists").find({title:plname}).toArray();
  //console.log(result2);
  result2[0].songs.push(soid);
  delete result2[0]._id;
  //console.log(result2);
  await client.db("432gp-db").collection("event_playlists").deleteOne({title:plname});
  //const result3 = await client.db("432gp-db").collection("event_playlists").find({title:plname}).toArray();
  //console.log(result3);
  await client.db("432gp-db").collection("event_playlists").insertMany(result2);
  const result4 = await client.db("432gp-db").collection("event_playlists").find({title:plname}).toArray();
  //console.log(result4);
  res.status(200).json({info:"song added to db successfully"});
});
app.get('/addPlaylist/:title/:djid/:plid', async (req,res) =>{
  await client.connect();
  const{title} = req.params;
  const{djid} = req.params;
  const {plid} = req.params;

  let newPlaylist = [{
    "creator" : "No creator specifide",
    "description" : "No desc availible",
    "playlist_id" : plid,
    "songs": [],
    "title":title
  }]
  
  await client.db("432gp-db").collection("event_playlists").insertMany(newPlaylist);
  const result2 = await client.db("432gp-db").collection("dj_profiles").find({id:djid}).toArray();
  //console.log(result2);
  result2[0].Playlists.push(plid);
  delete result2[0]._id;
  //console.log(result2);
  await client.db("432gp-db").collection("dj_profiles").updateOne({id:djid},{$set :{Playlists:result2[0].Playlists}});
  //const result3 = await client.db("432gp-db").collection("event_playlists").find({title:plname}).toArray();
  //console.log(result3);
  //await client.db("432gp-db").collection("event_playlists").insertMany(result2);
  const result4 = await client.db("432gp-db").collection("dj_profiles").find({id:djid}).toArray();
  //console.log(result4);
  res.status(200).json({info:"playlist added to db successfully"});
});
app.get('/swapSongs/:soindex1/:soindex2/:plname', async (req, res) => {
  await client.connect();
  const{soindex1} = req.params;
  const{soindex2} = req.params;
  const {plname} = req.params;
  const result2 = await client.db("432gp-db").collection("event_playlists").find({title:plname}).toArray();
  //console.log(result2);
  let temp = result2[0].songs[soindex1];
  //console.log(temp);
  result2[0].songs[soindex1] = result2[0].songs[soindex2];
  //console.log(result2[0].songs[soindex1]);
  result2[0].songs[soindex2] = temp;
  //console.log(result2[0].songs[soindex2]);
  //console.log(result2);
  await client.db("432gp-db").collection("event_playlists").updateOne({title:plname},{$set :{songs:result2[0].songs}});
  
  const result3 = await client.db("432gp-db").collection("event_playlists").find({title:plname}).toArray();
  //console.log(result3);
  res.status(200).json({info:"songs swapped"});
});

app.listen(8085, () => {
  console.log("Example express file server listening on port 8085");
});

//run().catch(console.dir);