//const MongoClient = require('mongodb').MongoClient
// This creates a variable called MongoClient which is a property of monodb.
// This also pulls out ObjectID. This is called object destructing
const {MongoClient, ObjectID} = require('mongodb') 

// var user = {name: 'Viji', age: 43};
// var {name} = user;//ES6 destructuring//
// console.log(name);

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to the database server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({  
    //     test: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Viji',
        age: 43,
        location: 'Plano'
    }, (err, result) => {
        if (err) {
            console.log('Unable to insert user', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id);
        console.log(result.ops[0]._id.getTimestamp());
    });

    client.close();
});