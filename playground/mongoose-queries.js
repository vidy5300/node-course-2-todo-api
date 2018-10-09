const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5bbc0a7a55812867a47d5b9c';

if (!ObjectID.isValid(id)) {
    console.log('Id is not valid');
}
else
{
    Todo.find({
        _id: id
    }).then((todos) => {
        console.log('Todos', todos);
    });

    Todo.findOne({
        _id: id
    }).then((todo) => {
        console.log('Todo', todo);
    });

    Todo.findById(id).then((todo) => {
        console.log('Todo by Id', todo);
    }).catch((e) => console.log(e));
}

var userId = '5bb58016d4f1151b7df7d3cd';

if (!ObjectID.isValid(userId)) {
    console.log('User Id is not valie');
}
else
{
    User.findById(userId).then((user) => {
        if (!user) {
            return console.log('Unable to find user');
        }
        console.log(JSON.stringify(user, undefined, 2));
    }, (e) => {
        console.log(e);
    })
}