function reducer(state, action) {

    switch (action.type) {
        case 'get-categories':
            const stateWithCategories = {
                ...state,
                listOfCategories: action.payload
            }
            return stateWithCategories


        case 'add-category':
            const newCategory = action.payload
            const newListofNotesAddedOne = [...state.listOfCategories, newCategory]
            const stateAddedCategory = {
                ...state,
                listOfCategories: newListofNotesAddedOne
            }
            return stateAddedCategory

        case 'delete-category':
            const newlistOfCategory =
                state.listOfCategories.filter(category => category.id !== action.payload.id)
            const newStateWithDeletedCategory = {...state, listOfCategories: newlistOfCategory }
            return newStateWithDeletedCategory

        case 'add-task':
            const categoryNew = action.payload
            console.log(state.listOfCategories)
            const categoriesUpdated =
                state.listOfCategories.map(category => category.id !== action.payload.id ?
                    category : categoryNew)
            const stateAddedTask = {
                ...state,
                listOfCategories: categoriesUpdated
            }
            return stateAddedTask

        case 'update-task':
            const taskUpdated = action.payload
            const categoryOfTaskUpdated = state.listOfCategories.find(category => category.id === taskUpdated.fk_Category);
            const categoryTaskUpdated = {
                ...categoryOfTaskUpdated,
                listOfTasks: categoryOfTaskUpdated.listOfTasks.map(task => task.id !== taskUpdated.id ? task : taskUpdated)
            };
            const categoriesUpdatedWithUpdated = state.listOfCategories.map(category => category.id !== taskUpdated.fk_Category ?
                category : categoryTaskUpdated);

            const stateUpdatedTask = {...state, listOfCategories: categoriesUpdatedWithUpdated }
            return stateUpdatedTask

        case 'update-taskCheckBox':
            const taskChecked = action.payload
            const categoryWithTaskCheckBox = state.listOfCategories.find(category => category.id === taskChecked.fk_Category);
            const categoryUpdatedCheckBox = {
                ...categoryWithTaskCheckBox,
                listOfTasks: categoryWithTaskCheckBox.listOfTasks.map(task => {
                    if (task.id === taskChecked.id) {
                        return taskChecked
                    }
                    return task
                })
            };
            const categoriesUpdatedWithCheckBox = state.listOfCategories.map(category => category.id !== taskChecked.fk_Category ?
                category : categoryUpdatedCheckBox);
            const stateCheckedBoxes = {...state, listOfCategories: categoriesUpdatedWithCheckBox }
            return stateCheckedBoxes


        case 'delete-task':
            const taskDeleted = action.payload
            console.log("taskDeleted", taskDeleted)
            const categoryOfTaskDeleted = state.listOfCategories.find(category => category.id === taskDeleted.fk_Category);
            const categoryUpdated = {
                ...categoryOfTaskDeleted,
                listOfTasks: categoryOfTaskDeleted.listOfTasks.filter(task => task.id !== taskDeleted.id)
            };
            const categoriesUpdatedWithDeleted = state.listOfCategories.map(category => category.id !== taskDeleted.fk_Category ?
                category : categoryUpdated);

            const stateDeletedTask = {...state, listOfCategories: categoriesUpdatedWithDeleted }
            return stateDeletedTask


    }
}

export default reducer;