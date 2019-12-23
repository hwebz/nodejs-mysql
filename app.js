const express = require('express');
const mysql = require('mysql');

const app = express();

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'pickcel',
    multipleStatements: true
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
    let user = {
        name: 'Ha Manh Do',
        email: 'dmeo@demo.com',
        password: 'dasdsdasdsdass'
    }

    let sql = `INSERT INTO users(name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}');SELECT id, name, email FROM temp_insert_users`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log({
            success: result[0].affectedRows > 0 ? true : false,
            post: [
                ...result[1].map(r => {
                    return Object.assign({}, r)
                })
            ]
        });
        res.send('Posts added!')
    })
})

// Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM zones';
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
    let sql = `UPDATE posts SET name = '${newTitle}' WHERE id = '${req.params.id}';SELECT * FROM temp_update_post`
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts updated!')
    })
})

// Delete post
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = '${req.params.id}';SELECT * FROM temp_delete_post`

    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts deleted!')
    })
})

app.listen('4000', () => {
    console.log('Server started on port 4000');
});