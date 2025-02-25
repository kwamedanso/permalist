import React, { useState, useContext } from 'react'
import { GoPencil } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { ItemContext } from './ItemListContext';

export default function Item({ id, title }) {
    const [isEditing, setIsEditing] = useState(false)
    const [input, setInput] = useState(title)
    const { dispatch } = useContext(ItemContext);

    function editInput(e, id, input) {
        e.preventDefault();
        dispatch({ type: "edit-item", payload: { id, title: input } })
        setIsEditing(false)
    }

    function deleteItem(e, id) {
        if (e.target.checked) {
            dispatch({ type: "delete-item", payload: { id } })
            return;
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
