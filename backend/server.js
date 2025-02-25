import express, { json, urlencoded } from "express";
import pg from "pg";

const app = express();
const port = 5005;

app.use(urlencoded({ extended: true }))
app.use(json())

const db = new pg.Pool({
    user: "postgres",
    password: "kwame",
    port: 5432,
    database: "permalist",
    host: "localhost"
})

db.connect()


app.get("/api", async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM items")
        const items = response.rows
        res.send(items)
    } catch (error) {
        console.log(error)
    }
})

app.post("/api/post", async (req, res) => {
    const { title } = req.body;
    try {
        const response = await db.query("INSERT INTO items(title) VALUES($1) RETURNING *", [title])
        res.send(response.rows[0])

    } catch (error) {
        console.log(error)
    }
})

app.delete("/api/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const response = await db.query("DELETE FROM items WHERE id = $1", [id])
        res.status(200).send("Item Deleted")

    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})