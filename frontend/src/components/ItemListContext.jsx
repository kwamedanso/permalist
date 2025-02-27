import React, { createContext, useReducer } from 'react'

const initState = []

export const ItemContext = createContext(initState)

function reducer(state, action) {
    let { type, payload } = action;

    switch (type) {
        case "fetch-data": {
            return [...payload.items]
        }
        case "add-item": {
            const { newItem } = payload;

            return [...state, newItem]


        }
        case "delete-item": {
            const { id } = payload;
            return state.filter((item) => item.id !== id)
        }
        case "edit-item": {
            let { id, title } = payload;
            return state.map(item => {
                if (item.id === id) {
                    return { ...item, title: title }
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
