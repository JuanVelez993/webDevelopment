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

            return state

        case 'add-note':
            return state

        case 'update-note':
            return state

        case 'delete-note':
            return state
    }
}

export default reducer;