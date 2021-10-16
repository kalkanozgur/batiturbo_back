module.exports = app => {
    const customerInfo = require("../controllers/customerInfo.controller.js")
    const customer = require("../controllers/customer.controller.js")

    var router = require("express").Router();

    // create customer çalışıyor
    router.post("/", customerInfo.create);
    
    // Retrieve all users çalışıyor
    router.get("/", customerInfo.findAll);

    // // Update a user with id çalışıyor
    // router.get("/:id", customerInfo.findOne);

    // Update a user with id çalışıyor
    router.put("/:id", customerInfo.update);

    

    app.use("/api/customer", router)
}