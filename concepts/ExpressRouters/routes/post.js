const express = require("express");
const router = express.Router();

app.get("/posts", (req, res) => {
    res.send("Posts Page");
});

app.get("/posts/:id", (req, res) => {
    res.send(`Post ID: ${req.params.id}`);
});

app.post("/posts/:id", (req, res) => {
    res.send(`Post ID: ${req.params.id}`);
});

app.delete("/posts/:id", (req, res) => {
    res.send(`Post ID: ${req.params.id} has been deleted`);
});

module.exports = router;
