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


app.get("/api/all", async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM items ORDER BY id ASC");
        const items = response.rows
        res.json(items)
    } catch (error) {
        console.log(error)
    }
})

app.post("/api/post/new", async (req, res) => {
    const { title } = req.body;

    try {
        const response = await db.query("INSERT INTO items(title) VALUES($1) RETURNING *", [title])
        if (response.rowCount !== 1) {
            res.status(404).json({ error: "Unable to add new item" })
        }
        res.status(200).json({ message: "Item added successfully", item: response.rows[0] })

    } catch (error) {
        console.log(error)
    }
})

app.post("/api/post/edit", async (req, res) => {
    const { id, title } = req.body;

    try {
        const response = await db.query(`UPDATE items SET title='${title}' WHERE id=${id} RETURNING *`)
        console.log(response.rows)
        if (response.rowCount !== 1) {
            return res.status(404).json({ error: "Enable to update item" })
        }
        return res.status(200).json({ message: "Item updated successfully", item: response.rows[0] })
    } catch (error) {
        console.log(error)
    }
})

app.delete("/api/delete/:id", async (req, res) => {
    let { id } = req.params;

    try {
        const response = await db.query("DELETE FROM items WHERE id = $1 RETURNING *", [Number(id)])
        if (response.rowCount !== 1) {
            return res.status(404).json({ error: "Item not found" })
        }

        return res.status(200).json({ message: "Item deleted successfully", deletedItem: response.rows[0] })

    } catch (error) {
        console.log(error)
    }
}
)

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})