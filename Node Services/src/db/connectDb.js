const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://ibrahim:Pt5DAwp1RmWOx58a@artasks.7ueff.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri);

//connects to Database and returns customers collection
async function connectDb(){
    await client.connect();
    console.log('Connected successfully to server');
    const database = client.db('customerDb');
    return database.collection('customerData');
}

module.exports = connectDb;