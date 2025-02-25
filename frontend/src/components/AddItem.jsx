import React, { useState, useRef, useContext } from 'react'
import { ItemContext } from './ItemListContext';

export default function AddItem() {
    const [input, setInput] = useState("")
    const { dispatch } = useContext(ItemContext);
    const inputRef = useRef(null);


    function addNewItem(e) {
        e.preventDefault();
        dispatch({ type: "add-item", payload: { newitem: input } })
        setInput("")
        inputRef.current.focus()
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
