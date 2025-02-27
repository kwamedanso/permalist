import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import Item from './Item'
import { ItemContext } from './ItemListContext'

export default function ItemLists() {
    const { state, dispatch } = useContext(ItemContext)

    useEffect(() => {

        async function getData() {
            const response = await axios.get("/api/all");
            const json = await response.data;
            dispatch({ type: "fetch-data", payload: { items: json } })
        }
        getData()
    }, [])


    return (
        <>
            {state?.map(item => <Item key={item.id} id={item.id} title={item.title} />)}
        </>
    )
}
