import React, { useState, useContext } from 'react'
import axios from 'axios';
import { GoPencil } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { ItemContext } from './ItemListContext';

export default function Item({ id, title }) {
    const [isEditing, setIsEditing] = useState(false)
    const [input, setInput] = useState(title)
    const { dispatch } = useContext(ItemContext);

    async function editInput(e, id, input) {
        e.preventDefault();
        try {
            const response = await axios.post("/api/post/edit", { id: id, title: input })
            if (response.status !== 200) {
                throw new Error(`HTTP Error: ${response.status}`)
            }
            const { id: itemId, title: newTitle } = response.data.item
            dispatch({ type: "edit-item", payload: { id: itemId, title: newTitle } })
            setIsEditing(false)
        } catch (error) {

        }
    }

    async function deleteItem(e, id) {
        const isChecked = e.target.checked;

        if (isChecked) {

            try {
                const response = await axios.delete(`/api/delete/${id}`)
                if (response.status !== 200) {
                    throw new Error(`HTTP Error! Status: ${response.status}`)
                }

                let itemId = response.data.deletedItem.id;
                dispatch({ type: "delete-item", payload: { id: itemId } })



            } catch (error) {
                console.error(error)
            }
        }
    }


    return (
        <div className="item">
            <form>
                <input type="checkbox" name="deleteItemId" onChange={(e) => deleteItem(e, id)} />
            </form>

            {isEditing ? <>
                <form onSubmit={(e) => editInput(e, id, input)}>
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                    <button id="item.id" className="edit" type='submit'><FaCheck /></button>
                </form>
            </> : <>
                <p id="tem.id">
                    {title}
                </p>

                <button id="item" className="edit" onClick={() => setIsEditing(true)} ><GoPencil /></button>
            </>}

        </div>
    )
}
