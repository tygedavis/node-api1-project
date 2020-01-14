// ✔ Implement your API here
const express = require('express');

const Data = require('./data/db');

const server = express();

server.use(express.json());

// ✔ GET -> Users (general)
server.get('/api/users', (req, res) => {
  Data.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    });
});

//TODO GET -> User (Specific ID)
server.get('api/users/:id', (req, res) => {
  const id = req.params.id

  Data.find(id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(404).json({ errorMessage: "The user with that ID does not exist." })
    })
})

// ✔ POST User
server.post('/api/users', (req, res) => {
  const userData = req.body;

  Data.insert(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ errorMessage: "Please provide name and bio for the user."});
    });
});

//TODO DELETE User



//TODO PUT -> Edit User

const port = 5000;
server.listen(port, () => console.log(`\n API on port ${port}\n`));