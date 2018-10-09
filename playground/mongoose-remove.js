const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/*
Todo.remove({}).then((result) => {
    console.log(result);
});*/

Todo.findOneAndRemove({_id: '5bbd3067fff1c9485846bcaa'}).then((result) => {
    console.log(result);
});

Todo.findByIdAndRemove('5bbd3067fff1c9485846bcaa').then((result) => {
    console.log(result);
});