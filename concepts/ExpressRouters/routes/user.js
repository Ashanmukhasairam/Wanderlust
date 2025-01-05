const express = require("express");
const router = express.Router();



router.get("/", (req, res) => {
    res.send("Hello, World!");
});



router.get("/users", (req, res) => {
    res.send("Users Page");
});

router.get("/users/:id", (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});

router.post("/users/:id", (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});

//delete posts
router.delete("/users/:id", (req, res) => {
    res.send(`User ID: ${req.params.id} has been deleted`);
});

module.exports = router;