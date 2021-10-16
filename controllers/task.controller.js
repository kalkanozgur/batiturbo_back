const db = require("../models");
const Task = db.task;
const Description = db.descriptions;
const Payment = db.payment;

exports.create = (req, res) => {
    

    Task.create({
        jobId: req.body.jobId,
        isCompleted: req.body.isCompleted,
        created_by: req.body.created_by,
        updated_by: req.body.updated_by,
    }).then(task => {
        if(req.body.description != null) {
            Description.create({
                text: req.body.description
            }).then(desc => task.addDescriptions(desc))
        }
        res.send({
            message: "Task created successfully", task
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating Task"
        })
    })
}

exports.findAll = (req, res) => {
    Task.findAll({
        include: [{
            model: db.user,
            as: "TaskCreatedBy",
            attributes: ["name"]
        }, {
            model: db.user,
            as: "TaskUpdatedBy",
            attributes: ["name"]
        }, {
            model: db.descriptions,
            as: "Descriptions",
            attributes: ["text"]
        }, {
            model: db.payment,
            as: "Payment"
        } 
    ]
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while getting Tasks"
        })
    })
}

exports.findByJobId = (req, res) => {
    const id = req.params.id;

    Task.findAll({
        where: {
            //TODO hata verirse job idyi nasıl aldığına bak
            idJob: id
        },
        include: [{
            model: db.job,
            as: "JobId"
        }, {
            model: db.user,
            as: "TaskCreatedBy",
            attributes: ["name"]
        }, {
            model: db.user,
            as: "TaskUpdatedBy",
            attributes: ["name"]
        }, {
            model: db.descriptions,
            as: "Descriptions",
            attributes: ["text"]
        }, {
            model: db.payment,
            as: "Payment"
        } 
    ]
    }).then(task => {
        if(task == null) {
            res.send({
                message: `Task not found {id=${id}}`
            })
        }
        else {
            console.log(task)
            res.send({task})
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while getting Task"
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Task.findOne({
        where: {
            idTask: id
        },
        include: [{
            model: db.job,
            as: "JobId"
        }, {
            model: db.user,
            as: "TaskCreatedBy",
            attributes: ["name"]
        }, {
            model: db.user,
            as: "TaskUpdatedBy",
            attributes: ["name"]
        }, {
            model: db.descriptions,
            as: "Descriptions",
            attributes: ["text"]
        }, {
            model: db.payment,
            as: "Payment"
        } 
    ]
    }).then(task => {
        if(task == null) {
            res.send({
                message: `Task not found {id=${id}}`
            })
        }
        else {
            console.log(task)
            res.send({task})
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while getting Task"
        })
    })
}

exports.update = (req, res) => {
    
    const id = req.params.id;
  
    Task.update(req.body, {
      where: { idTask: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Task was updated successfully.", 
          });
        } else {
          res.send({
            message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
            error: err,
            message: "Error updating Task with id=" + id
        });
      });
    
}

//payment
exports.createPayment = (req, res) => {
    Payment.create({
        taskId: req.body.taskId,
        payment_type: req.body.payment_type,
        payment_method: req.body.payment_method,
        debt: req.body.debt
    }).then(payment => {
        res.send({
        message: "Payment created successfully", payment
    })
    }).catch(err => res.status(500).send({
        message: err.message || "Some error occurred while creating Task"
    }))
}

exports.getPaymentById = (req, res) => {
    const id = req.params.id;

    Payment.findOne({
        where: {
            idPayment: id
        },
    }).then(payment => {
        if(payment == null) {
            res.send({
                message: `Payment not found {id=${id}}`
            })
        }
        else {
            console.log(payment)
            res.send({payment})
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while getting Payment"
        })
    })

}


exports.updatePayment = (req, res) => {
    const id = req.params.id;
    console.log(req.params)
    console.log(id);

    Payment.update(req.body, {
        where: { idPayment: id }

      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Payment was updated successfully.", 
            });
          } else {
            res.send({
              message: `Cannot update Payment with id=${id}. Maybe Payment was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
              error: err,
              message: "Error updating Payment with id=" + id
          });
        });

}


exports.addDesc = (req, res) => {
    const id = req.params.id;

    Task.findOne({ where: { idTask: id}}).then(task => {
        if(task == null) {
            console.log(id)
            res.send({
                message: `Task not found {id=${id}}`
            })
        }
        else {
            Description.create({
                text: req.body.description
            }).then(desc => {

                task.addDescriptions(desc)
                
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