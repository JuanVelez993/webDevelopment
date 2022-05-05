import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../StateManager/StoreProvider'


const Category = () => {
  const { state, dispatch } = useContext(Store)

  const [task, setTask] = useState('')

  const updateTask = (e, category) => {
    setTask({
      name: e.target.value,
      categoryId: category.id,
    });
    console.log("task 2: ", task)
  }


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

  const onCheckBox = async () => {
    
  }
  
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


  const addTask = async (requestTask) => {
    let response = await fetch(`http://localhost:8081/api/create/task`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(requestTask)
      })

    let data = await response.json()
    return data
  }


  const onAddTask = async () => {
    const requestTask = {
      taskName: task.name,
      fk_Category: task.categoryId,
      done: false
    }

    addTask(requestTask).then(
      (category) => {
        let action = {
          type: 'add-task',
          payload: category
        }
        dispatch(action)
        setTask("");
      }).catch(err => {
        console.log("The task wasnt removed", err)
      })
  
  }

  return (
    <div >
      <table >
        {
          state.listOfCategories.map(category => {

            return <tbody key={category.id} >
              <tr >
                <td> <h3>{category.name}</h3></td>
                <td> <input type='text' onChange={(e) => updateTask(e, category)} placeholder='Add task' /></td>
                <td> <button className="btn" onClick={onAddTask}> Add Task  </button></td>
                <td> <button className="btn" onClick={() => onDelete(category)}> Delete Category </button></td>
              </tr>
              <tr >
                <td>Id</td>
                <td>Task</td>
                <td>Done?</td>
                <td>Delete</td>
                <td>Edit</td>  
              </tr>
              {category.listOfTasks ? category.listOfTasks.map(task => {
                return <tr>
                  <td>{task.id}</td>
                  <td>{task.taskName}</td>
                  <td>
                    <input onChange={(e) => onCheckBox(e)} type="checkbox" checked={task.done} />
                  </td>
                  <td>Delete</td>
                  <td>Edit</td> 
                </tr>
              }) : ""}
        
            </tbody>
          })
        }
      </table>
    </div>
  )
}

export default Category