import React, { useContext, useState,useRef } from 'react'
import { Store } from '../StateManager/StoreProvider'

const Header = () => {
  const formRef = useRef(null)

  const [category, setCategory] = useState('')

  const addCategory = (e) => {
    setCategory(e.target.value)
  }

  const onAdd = async (event) => {
    event.preventDefault();
    if (category) {
      const newCategory = {
        name: category,
        listOfTasks: [],
      }

      let savedCategoryPromise = await fetch(`http://localhost:8081/api/create/category`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(newCategory)
        })

      let categorySaved = await savedCategoryPromise.json()

      dispatch({
        type: 'add-category',
        payload: categorySaved
      })

      //formRef.current.reset();
    } 
  }



  const { state, dispatch } = useContext(Store)
    
  return (
    <div><h1>Dashboard</h1>
      <form className="add-form" onSubmit={onAdd} id="form">
              <div className="form-control">
                  <label>Create Category: </label>
          <input type="text" name="category" onChange={addCategory} />
              </div>
        <button className="button-51" >Add Category</button>
          </form>
    </div>
  )
}

export default Header