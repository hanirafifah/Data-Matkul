const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

// Panggil express function
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "makelekele1609.",
    database: "bootcampday3"
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected');
})

// Client settings
app.set('view engine', 'ejs');

// Route
// Front Page
app.get("/", (req, res) => {
    res.render('frontpage');
})
// From
app.get("/form", (req, res) => {
    res.render('form');
})
// Data
app.get("/data", (req, res) => {
    const query = "SELECT * FROM matkul";
    db.query(query, (err, response) => {
        if (err) throw err;
        res.render('data', { matkul: response });
    })
})

// API End Point
// 1. Post data
app.post("/postdata", (req, res) => {
    const nama = req.body.nama;
    const kode = req.body.kode;
    const dosen = req.body.dosen;

    const query = "INSERT INTO matkul (nama, kode, dosen) VALUES (?, ?, ?)";
    const values = [nama, kode, dosen];
    db.query(query, values, (err, response) => {
        if (err) throw err;
        res.send({
            message: "Data submitted"
        });
    });
})
// 2. Read data
app.get("/readdata", (req, res) => {
    const query = "SELECT * FROM matkul";
    db.query(query, (err, response) => {
        if (err) throw err;
        res.send(response);
    })
})
// 3. Update data
app.put("/updatedata/:id", (req, res) => {
    const id = req.params.id;
    const nama = req.body.nama;
    const kode = req.body.kode;
    const dosen = req.body.dosen;

    const query = "UPDATE matkul SET nama = ?, kode = ?, dosen = ? WHERE id = ?";
    const values = [nama, kode, dosen, id];
    db.query(query, values, (err, response) => {
        if (err) throw err;
        res.send(response);
    })
})
// 4. Delete data
app.delete("/deletedata/:id", (req, res) => {
    const id = req.params.id;

    const query = "DELETE FROM matkul WHERE id = ?";
    db.query(query, id, (err, response) => {
        if (err) throw err;
        res.send({
            message: "Deleted"
        })
    })
})

// Start server
app.listen(3000, () => console.log("Server started..."));