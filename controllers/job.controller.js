const db = require("../models");
const Job = db.job;
const Description = db.descriptions

exports.create = (req, res) => {
    

    Job.create({
        isCompleted: req.body.isCompleted,
        isPaused: req.body.isPaused,
        customer_id: req.body.customer_id,
        created_by: req.body.created_by,
        updated_by: req.body.updated_by,
        turbo_id: req.body.turbo_id
    }).then(job => {
        if(req.body.description != null) {
            Description.create({
                text: req.body.description
            }).then(desc => job.addDescriptions(desc))
        }
        res.send({
            message: "Job created successfully", job
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating Job"
        })
    })
}

exports.findAll = (req, res) => {
    Job.findAll({
        include: [{
            model: db.customerInfo,
            as: "Customer",
            attributes: ["idCustomer", "name", "phone"]
        }, {
            model: db.turbo,
            as: "Turbo"
        }, {
            model: db.user,
            as: "JobCreatedBy",
            attributes: ["name"]
        }, {
            model: db.user,
            as: "JobUpdatedBy",
            attributes: ["name"]
        }, {
            model: db.task,
            as: "Tasks"
        }, {
            model: db.descriptions,
            as: "Descriptions",
            attributes: ["text"]
        }, {
            model: db.payment,
            as: "Payments"
        } 
    ]
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while getting Jobs"
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Job.findOne({
        where: {
            idJob: id
        },
        include: [{
            model: db.customerInfo,
            as: "Customer",
            attributes: ["idCustomer", "name", "phone"]
        }, {
            model: db.turbo,
            as: "Turbo"
        }, {
            model: db.user,
            as: "JobCreatedBy",
            attributes: ["name"]
        }, {
            model: db.user,
            as: "JobUpdatedBy",
            attributes: ["name"]
        }, {
            model: db.task,
            as: "Tasks"
        }, {
            model: db.descriptions,
            as: "Descriptions",
            attributes: ["text"]
        }, {
            model: db.payment,
            as: "Payments"
        } 
    ]
    }).then(job => {
        if(job == null) {
            res.send({
                message: `Job not found {id=${id}}`
            })
        }
        else {
            console.log(job)
            res.send({job})
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while getting Job"
        })
    })
}

exports.update = (req, res) => {
    
    const id = req.params.id;
  
    Job.update(req.body, {
      where: { idJob: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Job was updated successfully.", 
          });
        } else {
          res.send({
            message: `Cannot update Job with id=${id}. Maybe Job was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
            error: err,
            message: "Error updating Job with id=" + id
        });
      });
    
}

exports.addDesc = (req, res) => {
    const id = req.params.id;
    // console.log(id)

    Job.findOne({ where: { idJob: id}}).then(job => {
        if(job == null) {
            res.send({
                message: `Job not found {id=${id}}`
            })
        }
        else {
            Description.create({
                text: req.body.description
            }).then(desc => {

                job.addDescriptions(desc)
                
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