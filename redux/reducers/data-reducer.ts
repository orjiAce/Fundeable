import {SET_ROUTE,SET_SELECTED_TAB, HIDE_BOTTOM_TAB, SWITCH_THEME} from "../Types";



const initialState = {
routeName: {},
    tabStatus: true,
    theme:'light',
    selectedTab: 'Home'
}

const dataReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SWITCH_THEME:
            return {
                ...state,
theme: action.payload
            }
        case SET_ROUTE:
            return {
                ...state,
                routeName: action.payload
            }
        case HIDE_BOTTOM_TAB:{
            return {
                ...state,
                tabStatus: !state.tabStatus
            }
        }
        case SET_SELECTED_TAB:
            return {
                ...state,
                selectedTab: action.payload
            }

        default:
            return state;
    }
}

export default dataReducer