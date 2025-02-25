import React from 'react'
import Footer from './components/Footer'
import ItemListContext from './components/ItemListContext'
import Title from './components/Title'
import ItemLists from './components/ItemLists'
import AddItem from './components/AddItem'


export default function App() {


  return (
    <main>
      <Title />
      <div className="box">
        <ItemListContext>
          <ItemLists />
          <AddItem />
        </ItemListContext>
      </div>
      <Footer />
    </main>
  )
}