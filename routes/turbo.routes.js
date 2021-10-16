module.exports = app => {
    const turbo = require("../controllers/turbo.controller.js")

    var router = require("express").Router();

    // create turbo çalışıyor
    router.post("/", turbo.create);
    
    // Retrieve all turbo çalışıyor
    router.get("/", turbo.findAll);

    // Update a turbo with id 
    router.get("/:id", turbo.findOne);

    // Add Description to turbo
    router.post("/description:id", turbo.addDesc)

    // Update description by id
    router.put("/description:id", turbo.editDesc)

    // // Update a turbo with id 
    // router.put("/:id", turbo.update);

    

    app.use("/api/turbo", router)
}