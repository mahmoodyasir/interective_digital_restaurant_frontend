export const initialstate = {
    page_reload: null,
    profile: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "PAGE_RELOAD":
            return {
                ...state,
                page_reload: action.page_reload
            }
        case "ADD_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        default:
            return this.state;
    }
}

export default reducer;