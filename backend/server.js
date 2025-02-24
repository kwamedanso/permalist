import express from "express";
import pg from "pg";

const app = express();
const port = 5005;

const db = new pg.Pool({
    user: "postgres",
    password: "kwame",
    port: 5432,
    database: "permalist",
    host: "localhost"
})

db.connect()


app.get("/", (req, res) => {
    res.send("This is from the permalist backend.")
})

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})