const db = require("../models");
const Customer = db.customerInfo;


exports.create = (req, res) => {
    
    Customer.create({
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        vkn: req.body.vkn
    }).then(data => {
        res.send({
            message: "Customer created successfully", data
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating Customer"
        })
    })
}

exports.findAll = (req, res) => {
    Customer.findAll().then(data => res.send(data)).catch(
        err => res.status(500).send({message: err.message || "Some error occurred while getting Customers"})
    )
}


exports.findOne = (req, res) => {
    const id = req.params.id;

    Customer.findOne({
        where: {
            idCustomer: id
        }
    }).then(customer => {
        if(customer === null) {
            res.send({
                message: `Customer not found {id=${id}}`
            })
        }
        else {
            res.send({customer})
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while getting Customer"
        })
    })
}

exports.update = (req, res) => {
    
    const id = req.params.id;
  
    Customer.update(req.body, {
      where: { idCustomer: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Customer was updated successfully.", 
          });
        } else {
          res.send({
            message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Customer with id=" + id
        });
      });
    
};
