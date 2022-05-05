function reducer(state, action) {

    switch (action.type) {
        case 'get-categories':

            return state

        case 'add-category':
            const newCategory = action.payload
            const newListofNotesAddedOne = [...state.listOfCategories, newCategory]
            const stateAddedCategory = {
                ...state,
                listOfCategories: newListofNotesAddedOne
            }
            return stateAddedCategory

        case 'delete-category':

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