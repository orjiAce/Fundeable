import {SET_ROUTE, SET_SELECTED_TAB, HIDE_BOTTOM_TAB, SWITCH_THEME} from "../Types";

export const toggleBottomTab = () => (dispatch: any)=>{
    dispatch({
        type: HIDE_BOTTOM_TAB
    })
}
export const toggleTheme = (theme: string) => (dispatch: any)=>{
    dispatch({
        type: SWITCH_THEME,
        payload: theme
    })
}

export const updateRouteName = (route: object) => (dispatch: any) =>{
    dispatch({
        type: SET_ROUTE,
        payload: route
    })
}


export const handleTab = (selectedTab: string) => (dispatch: any) =>{
    dispatch({
        type: SET_SELECTED_TAB,
        payload: selectedTab
    })
}