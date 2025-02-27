import React, { useState, useRef, useContext } from 'react'
import { ItemContext } from './ItemListContext';
import axios from 'axios';

export default function AddItem() {
    const [input, setInput] = useState("")
    const { dispatch } = useContext(ItemContext);
    const inputRef = useRef(null);


    async function addNewItem(e) {
        e.preventDefault();

        try {
            const response = await axios.post("/api/post/new", { title: input })
            if (response.status !== 200) {
                throw new Error(`HTTP Error! Status: ${response.status}`)
            }
            dispatch({ type: "add-item", payload: { newItem: response.data.item } })
            setInput("")
            inputRef.current.focus()

        } catch (error) {
            console.log("Error: ", error)
        }
    }
    return (
        <form onSubmit={addNewItem}>

            <input
                type="text"
                placeholder="New Item"
                autoComplete='false'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus={true}
                ref={inputRef}
            />

            <button className="add" type="submit" name="list">+</button>
        </form>
    )
}
