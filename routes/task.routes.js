module.exports = app => {
    const task = require("../controllers/task.controller.js")

    var router = require("express").Router();

    // create task çalışıyor
    router.post("/", task.create);
    
    // Retrieve all turbo çalışıyor
    router.get("/", task.findAll);
    
    // Retrieve all Task çalışıyor
    router.get("/byJob:id", task.findByJobId);

    // Update a Task with id 
    router.get("/:id", task.findOne);

    // Update a task with id 
    router.put("/:id", task.update);

    // Add Payment
    router.post("/payment", task.createPayment)

    //TODO Get payment by id
    router.get("/payment:id", task.getPaymentById)

    // Update payment
    router.put("/payment:id", task.updatePayment)

    // Add Description to Task
    router.post("/description:id", task.addDesc)

    // Update description by id
    router.put("/description:id", task.editDesc)


    

    app.use("/api/task", router)
}