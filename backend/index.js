import express from "express";
import mysql from "mysql"
import cors from "cors"

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST || "db",
    port: process.env.DATABASE_PORT || 3306,
    user: process.env.DATABASE_USER || "devops",
    password: process.env.DATABASE_PASSWORD || "test1234",
    database: process.env.DATABASE_NAME || "test"
})

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to the database!");
    }
});

app.use(express.json()) // Return JSON data using the API server postman

app.use(cors());

app.get("/", (req, res) => {
    res.json("Hello World from the backend!!!")
})

app.get("/books", (req, res) => {
    const query = "SELECT * FROM books"
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const query = "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover
    ]

    db.query(query, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been created successfully!!!")
    })
})

app.delete("/books/:id", (req, res) => {
    const bookID = req.params.id
    const query = "DELETE FROM books WHERE id = ?"

    db.query(query, [bookID], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been deleted successfully!!!")
    })
})

app.put("/books/:id", (req, res) => {
    const bookID = req.params.id
    const query = "UPDATE books SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover
    ]

    db.query(query, [...values, bookID], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been updated successfully!!!")
    })
})

// Add logging middleware to help debug API requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.listen(8800, () => {
    console.log("Connected to the backend on port 8800!")
    console.log("API is ready to receive requests")
})
