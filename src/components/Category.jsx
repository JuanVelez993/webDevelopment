import React from 'react'

const Category = () => {
  return (
      <div><form >
          <input
              type="text"
              name="name"
              placeholder="¿What are you planning to do today?"/>
             <button onClick={onEdit}>Update</button>
           <button onClick={onAdd}>Delete</button>
      </form></div>
  )
}

export default Category