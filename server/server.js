const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/todo');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id))
    {
        return res.sendStatus(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.send(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.sendStatus(400).send(e);
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id))
    {
        return res.sendStatus(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.statusCode(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.sendStatus(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    //Only pick text and completed property to body variable
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id))
    {
        return res.sendStatus(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set : body}, {new: true}).then((todo) => {
        if (!todo){
            return res.sendStatus(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.sendStatus(404).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});



module.exports = {app};