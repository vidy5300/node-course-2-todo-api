//const MongoClient = require('mongodb').MongoClient
// This creates a variable called MongoClient which is a property of monodb.
// This also pulls out ObjectID. This is called object destructing
const {MongoClient, ObjectID} = require('mongodb') 


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to the database server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // find() is the pointer to the documents
    // toArray() is the array of documents
    db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch Todos', err);
    });

    client.close();
});