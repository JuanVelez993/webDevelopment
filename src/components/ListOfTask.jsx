import React from 'react'

const ListOfTask = (props) => {
    return (
        props.category.listOfTasks ? category.listOfTasks.map(task => {
            return <tr key={task.id}>
                <td>{task.id}</td>
                <td style={task.done ? { textDecoration: 'line-through' } : {}}>{task.taskName}</td>
                <td>
                    <input onChange={(e) => onCheckBox(e, task)} type="checkbox" checked={task.done} />
                </td>
                <td><button className="btn" onClick={(e) => onDeleteTask(task)}>X </button></td>
                <td><button className="btn" disabled={task.done} onClick={(e) => onEdit(e, task)}> Edit Task </button></td>
            </tr>
        }) : ""
    )
}

export default ListOfTask