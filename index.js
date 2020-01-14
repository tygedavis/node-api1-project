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
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id

  Data.findById(id)
    .then(user => {
        if(!user) {
          res.status(404).json({ errorMessage: "The user with that ID does not exist." })
        }else
          res.status(200).json(user)
        })
    .catch(err => {
      res.status(500).json({ errorMessage: "The users information could not be retrieved" })
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

// ✔ DELETE User
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id

  Data.remove(id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ errorMessage: "The user with that ID does not exist." });
    });
});


// ✔ PUT -> Edit User
server.put('/api/users/:id', (req, res) => {
  const userData = req.params.id;

    Data.update(userData, req.body)
      .then(user => {
          if(!user) {
            res.status(404).json({ errorMessage: "The user with that ID does not exist." })
          }else if(!req.body.name || !req.body.bio){
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
          }else
            res.status(200).json(user)
          })
      .catch(err => {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
      })
});

const port = 5000;
server.listen(port, () => console.log(`\n API on port ${port}\n`));