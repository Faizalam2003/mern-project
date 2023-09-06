// Server Setup and MySQL Connection
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "kanban_board",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

//  API Endpoints
app.get("/tasks", (req, res) => {
  let sql = "SELECT * FROM tasks";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/tasks", (req, res) => {
  let task = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  };
  let sql = "INSERT INTO tasks SET ?";
  db.query(sql, task, (err, result) => {
    if (err) throw err;
    res.send("Task added...");
  });
});

app.put("/tasks/:id", (req, res) => {
  let sql = `UPDATE tasks SET title = '${req.body.title}', description = '${req.body.description}', status = '${req.body.status}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Task updated...");
  });
});

app.delete("/tasks/:id", (req, res) => {
  let sql = `DELETE FROM tasks WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Task deleted...");
  });
});

//  Start Server
app.listen("3000", () => {
  console.log("Server started on port 3000");
});
