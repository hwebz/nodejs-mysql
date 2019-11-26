const express = require('express');
const mysql = require('mysql');

const app = express();

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'pickcel'
});

// Connect
db.connect(error => {
    if (error) {
        throw error;
    }

    console.log('MySQL Connected!');
});

// Create DB
// remove database: 'pickcel' before access this route
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DABTABASE sampledb';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created!');
    })
})

// Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id CHAR(36), AUTO_INCREMENT, name VARCHAR(255), content VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table created!')
    })
})

// Insert post
app.get('/addpost1', (req, res) => {
    let post = {
        name: 'Demo 4',
        content: 'Demo content for post 4'
    }

    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts added!')
    })
})

// Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts fetched!')
    })
})

// Select single post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = '${req.params.id}'`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts fetched!')
    })
})

// Update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET name = '${newTitle}' WHERE id = '${req.params.id}'`
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts updated!')
    })
})

// Delete post
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = '${req.params.id}'`
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts deleted!')
    })
})

app.listen('4000', () => {
    console.log('Server started on port 4000');
});