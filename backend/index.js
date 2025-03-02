import express from "express";
import mysql from "mysql"
import cors from "cors"

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST || "database",
    port: process.env.DATABASE_PORT || 3306,
    user: process.env.DATABASE_USER || "user",
    password: process.env.DATABASE_PASSWORD || "password",
    database: process.env.DATABASE_NAME || "db"
})

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to the database!");
    }
});

app.use(express.json()) // Return JSON data using the API server postman

// Updated CORS settings to allow both www and non-www domains
const corsOptions = {
    origin: ["https://www.dev-ops-project.com", "https://dev-ops-project.com"],
    credentials: true
};
app.use(cors(corsOptions));

// This middleware will help match the URLs from nginx
// It will handle API requests coming through the /api/ path
app.use((req, res, next) => {
    // Check if the URL path starts with /api
    if (req.url.startsWith('/api')) {
        // Strip '/api' from the URL path for internal routing
        req.url = req.url.replace(/^\/api/, '');
    }
    next();
});

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
