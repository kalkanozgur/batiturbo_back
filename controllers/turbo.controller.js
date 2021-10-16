const db = require("../models");
const Turbo = db.turbo;
const Description = db.descriptions

exports.create = (req, res) => {
    

    //TODO CustomerDescriptions nalaka aq
    Turbo.create({
        name: req.body.name,
        code: req.body.code,
    }).then(turbo => {
        if(req.body.description != null) {
            Description.create({
                text: req.body.description
            }).then(desc => turbo.addDescriptions(desc))
        }
        res.send({
            message: "Turbo created successfully", turbo
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating Turbo"
        })
    })
}

exports.findAll = (req, res) => {
    Turbo.findAll({
        include: [{
            model: db.descriptions,
            as: "Descriptions",
            attributes: ["text"]
        }
    ]
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while getting Turbos"
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Turbo.findOne({
        where: {
            idTurbo: id
        },
        include: [{
            model: db.descriptions,
            as: "Descriptions",
            attributes: ["text"]
        }
    ]
    }).then(turbo => {
        if(turbo == null) {
            res.send({
                message: `Turbo not found {id=${id}}`
            })
        }
        else {
            console.log(turbo)
            res.send({turbo})
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while getting Turbo"
        })
    })
}

exports.update = (req, res) => {
    
    const id = req.params.id;
  
    Turbo.update(req.body, {
      where: { idTurbo: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Turbo was updated successfully.", 
          });
        } else {
          res.send({
            message: `Cannot update Turbo with id=${id}. Maybe Turbo was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
            error: err,
            message: "Error updating Turbo with id=" + id
        });
      });
    
}

exports.addDesc = (req, res) => {
    const id = req.params.id;
    // console.log(id)

    Turbo.findOne({ where: { idTurbo: id}}).then(turbo => {
        if(turbo == null) {
            res.send({
                message: `Turbo not found {id=${id}}`
            })
        }
        else {
            Description.create({
                text: req.body.description
            }).then(desc => {

                turbo.addDescriptions(desc)
                
                res.send({
                    message: "Description created successfully", desc
                })
            })
        }
    })

    
}

exports.editDesc = (req, res) => {
    const id = req.params.id;

    Description.update(req.body, {
        where: { idDescription: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Description was updated successfully.", 
            });
          } else {
            res.send({
              message: `Cannot update Description with id=${id}. Maybe Description was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
              error: err,
              message: "Error updating Description with id=" + id
          });
        });


    
}