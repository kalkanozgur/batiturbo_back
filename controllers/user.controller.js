const db = require("../models");
const User = db.user;

exports.create = (req, res) => {
    
    User.create({
        name: req.body.name,
        pin: req.body.pin,
        role: req.body.role
    }).then(data => {
        res.send({
            message: "User created successfully", data
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating User"
        })
    })
}

exports.findAll = (req, res) => {
    User.findAll().then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while getting Users"
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findOne({
        where: {
            idUser: id
        }
    }).then(user => {
        if(user === null) {
            res.send({
                message: `User not found {id=${id}}`
            })
        }
        else {
            res.send({user})
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while getting User"
        })
    })
}

exports.update = (req, res) => {
    
    const id = req.params.id;
  
    User.update(req.body, {
      where: { idUser: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully.", 
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
    
  };