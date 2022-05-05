import React, { useContext, useEffect } from 'react'
import { Store } from '../StateManager/StoreProvider'


const Category = () => {
  const { state, dispatch } = useContext(Store)

  useEffect(() => {

    let listOfCategories = fetchAllCategories().then(
      (category) => {
        let action = {
          type: 'get-categories',
          payload: category
        }
        dispatch(action)
      })
  }, [])


  const fetchAllCategories = async () => {
    let response = await fetch(`http://localhost:8081/api/get/categories`)
    let data = await response.json()
    return data
  }


  //delete to-do
  const onDelete = async (category) => {

    let response = await fetch(`http://localhost:8081/api/delete/category`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(category)
      })

    let categoryDeleted = await response

    if (categoryDeleted.status === 200) {

      dispatch({
        type: 'delete-category',
        payload: category
      })
    } else {
      console.log("The category wasnt removed")
    }

  }

  return (
    <div >
      <table >
        {
          state.listOfCategories.map(category => {

            return <tbody key={category.id} >
              <tr >
                <td> <h3>{category.name}</h3></td>
                <td> <input  type='text' placeholder='Add task' /></td>
                <td> <button className="btn"> Add Task </button></td>
                <td> <button className="btn" onClick={() => onDelete(category)}> Delete Category </button></td>
              </tr>
              <tr >
                <td>Id</td>
                <td>Task</td>
                <td>Done?</td>
                <td>Delete</td>
                <td>Edit</td>
              </tr>
        
            </tbody>
          })
        }
      </table>
    </div>
  )
}

export default Category