import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../StateManager/StoreProvider'

const ListOfTask = (props) => {

    const { state, dispatch } = useContext(Store)

    const onCheckBox = async (e, task) => {
        const checked = e.currentTarget.checked;
        let taskChecked = { ...task, done: checked }
        let taskUpdatedPromise = await fetch(`http://localhost:8081/api/update/task`, {
            method: 'PUT', headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(taskChecked),
        })
        let taskUpdated = await taskUpdatedPromise.json();
        dispatch({
            type: 'update-taskCheckBox',
            payload: taskUpdated
        })

    }

    const deleteTask = async (requestTask) => {
        let response = await fetch(`http://localhost:8081/api/delete/task`,
            {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(requestTask)
            })
    }

    const onDeleteTask = async (task) => {
        deleteTask(task).then(
            () => {
                let action = {
                    type: 'delete-task',
                    payload: task
                }
                dispatch(action)
            }).catch(err => {
                console.log("The task was not removed", err)
            })
    }

    const onEdit = async (e, task) => {
         props.setUpdated({
            clicked: true,
            task: task
        });
        document.getElementById("inputTask").value = task.taskName;

    }

    return (
        props.category.listOfTasks ? props.category.listOfTasks.map(task => {
            return <tr key={task.id}>
                <td>{task.id}</td>
                <td style={task.done ? { textDecoration: 'line-through' } : {}}>{task.taskName}</td>
                <td>
                    <input onChange={(e) => onCheckBox(e, task)} type="checkbox" checked={task.done} />
                </td>
                <td><button className="button-52" onClick={(e) => onDeleteTask(task)}>X </button></td>
                <td><button className="button-53" disabled={task.done} onClick={(e) => onEdit(e, task)}> Edit Task </button></td>
            </tr>
        }) : ""
    )
}

export default ListOfTask