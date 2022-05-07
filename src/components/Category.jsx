import React, { useContext, useEffect, useState } from 'react'
import ListOfTask from './ListOfTask'
import { Store } from '../StateManager/StoreProvider'


const Category = (props) => {
  const { state, dispatch } = useContext(Store)

  const [taskField, setTaskField] = useState('')

  const updateTaskField = (e, category) => {
    setTaskField({
      name: e.target.value,
      categoryId: category.id,
    });

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
      taskName: taskField.name,
      fk_Category: taskField.categoryId,
      done: false
    }

    addTask(requestTask).then(
      (category) => {
        let action = {
          type: 'add-task',
          payload: category
        }
        dispatch(action)
        setTaskField("");
      }).catch(err => {
        console.log("The task wasnt added", err)
      })
  
  }
  
  const updateTask =async () => {
    const taskRequest = { ...props.updated.task, 
      taskName: taskField.name
    }
    let response = await fetch(`http://localhost:8081/api/update/task`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(taskRequest)
      })

    let data = await response.json()
    return data
    
  }

  const onUpdateTask = async (task) => {
    updateTask(task).then(
      (updatedTask) => {
        let action = {
          type: 'update-task',
          payload: updatedTask
        }
        dispatch(action)
        document.getElementById("inputTask").value = "";
      }).catch(err => {
        console.log("The task was not updated", err)
      })
      props.setUpdated({clicked:false})
      
  }

  return (
    <div className="main-div">
      <table className="table">
        {
          state.listOfCategories.map(category => {

            return <tbody key={category.id} >
              <tr >
                <td> <h3 ClassName="category">{category.name}</h3></td>
                <td> <input type='text' id="inputTask" onChange={(e) => updateTaskField(e, category)} placeholder='Add task' /></td>
                <td> <button className="button-51" onClick={props.updated.clicked && category.id == props.updated.task.fk_Category ? onUpdateTask : onAddTask}> {props.updated.clicked && category.id ==props.updated.task.fk_Category ? "Update":"Add"}</button></td>
                <td> <button className="button-51" onClick={() => onDelete(category)}> Delete Category </button></td>
              </tr>
              <tr className="bar">
                <td>Id</td>
                <td>Task</td>
                <td>Done?</td>
                <td>Delete</td>
                <td>Edit</td>  
              </tr>
              <ListOfTask category={category} setUpdated={props.setUpdated}/>
              <br />
            </tbody>
            
          })
        }
      </table>
    </div>
  )
}

export default Category