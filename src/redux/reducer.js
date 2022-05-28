import { DELETE_DATA, GET_DATA, POST_DATA, UPDATE_DATA } from "./actionsType"

const initialState= {
    getData : [],
    newId : ""
}


export const Reducer = (state=initialState,{type,payload}) =>{
    switch (type) {
        case GET_DATA:
            return {
                ...state,
                getData: payload               
            }
        case POST_DATA:
            return {
                ...state,
                getData: [...state.getData, payload]                
            }
        case UPDATE_DATA:
            return {
                ...state,
                getData : payload   
            }
        case DELETE_DATA:
            return {
                ...state,
                getData: state.getData.filter((el)=> el.Time !== payload)             
            }
        
        default:
           return state
    }
}