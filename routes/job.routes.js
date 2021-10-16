module.exports = app => {
    const job = require("../controllers/job.controller.js")

    var router = require("express").Router();

    // create job çalışıyor
    router.post("/", job.create);
    
    // Retrieve all users çalışıyor
    router.get("/", job.findAll);

    // Update a user with id 
    router.get("/:id", job.findOne);
    
    // Update a job with id 
    router.put("/:id", job.update);

    // TODO Get Jobs all payment


    /////////////////////////
    // Add Description to Job
    router.post("/description:id", job.addDesc)

    // Update description by id
    router.put("/description:id", job.editDesc)


    

    app.use("/api/job", router)
}