const express = require('express');
const body_parser = require('body-parser');
const date = require(__dirname+'/date.js');
const app = express();
const port = 3000;

app.set('view-engine', 'ejs');
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static("public"));


const tasks = ["code", "eat", "sleep"];
const workList = [];

app.get("/", function(req, res) {

    let day = date.getDate();
    res.render("list.ejs", { kindOfDay: day, task: tasks });
});

app.post("/", function(req, res) {
    // console.log(req.body);
    let newEntry = req.body.newTask;

    if (req.body.list === "Work") {
        workList.push(newEntry);
        res.redirect("/work");
    } else {
        tasks.push(newEntry);
        res.redirect("/");
    }
});
app.listen(port, function() {
    console.log("The server is running on port " + port + "!");
});

app.get("/work", function(req, res) {
    res.render("list.ejs", { kindOfDay: "Work", task: workList });
});

app.post("/work", function(req, res) {

    let item = req.body.newTask;


    res.redirect("/work");
});

app.get("/about",function(req, res){
    res.render("about.ejs")
});