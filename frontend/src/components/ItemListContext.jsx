import React, { createContext, useReducer } from 'react'
import axios from 'axios'

const ACTIONS = {
    ADD_ITEM: "add-item",
    DELETE_ITEM: "delete-item",
    EDIT_ITEM: "edit-item",
    FETCH_DATA: "fetch-data"
}
const initState = []

export const ItemContext = createContext(initState)

function reducer(state, action) {
    let { type, payload } = action;

    switch (type) {
        case ACTIONS.FETCH_DATA: {
            return [...payload.items]
        }
        case ACTIONS.ADD_ITEM: {
            const { newitem } = payload;
            async function postNewItem() {
                try {
                    const response = await axios.post("/api/post", { title: newitem })
                    const { id, title } = response.data
                    return [...state, { id: id, title: title }]
                } catch (error) {
                    console.log(error)
                }
            }

            postNewItem()
        }
        case ACTIONS.DELETE_ITEM: {
            const { id } = payload
            async function deleteItem() {
                try {
                    const response = await axios.delete(`/api/delete/${id}`)
                    return state.filter(item => item.id !== id)
                } catch (error) {
                    console.log(error)
                }
            }
            deleteItem()
        }
        case ACTIONS.EDIT_ITEM: {
            return state.map(item => {
                if (item.id === payload.id) {
                    return { ...item, title: payload.title }
                }
                return item;
            })
        }
        default:
            break;
    }
}


export default function ItemListContext({ children }) {


    const [state, dispatch] = useReducer(reducer, initState)
    return (
        <ItemContext.Provider value={{ state, dispatch }}>
            {children}
        </ItemContext.Provider>
    )
}
