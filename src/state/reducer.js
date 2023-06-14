export const initialstate = {
    page_reload: null,
    profile: null,
    cart_incomplete: null,
    cart_complete: null,
    only_product:null,
    admin_profile: null,
    all_orders: null,
    all_status: null,
    all_admin: null,
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
        case "ADD_CARTINCOMPLETE":
            return {
                ...state,
                cart_incomplete: action.cart_incomplete
            }
        case "ADD_CARTCOMPLETE":
            return {
                ...state,
                cart_complete: action.cart_complete
            }
        case "ONLY_PRODUCT":
                return {
                    ...state,
                    only_product: action.only_product
                }
        case "ADMIN_PROFILE":
                return {
                    ...state,
                    admin_profile: action.admin_profile
                }
        case "ALL_ORDERS":
                return {
                    ...state,
                    all_orders: action.all_orders
                }
         case "ALL_STATUS":
                return {
                    ...state,
                    all_status: action.all_status
                }
         case "ALL_ADMIN":
                return {
                    ...state,
                    all_admin: action.all_admin
                }
        default:
            return this.state;
    }
}

export default reducer;