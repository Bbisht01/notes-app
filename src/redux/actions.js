import { DELETE_DATA, EDIT_DATA, GET_DATA, POST_DATA, UPDATE_DATA } from "./actionsType"

export const getDataFromSupabase = (payload) =>{
   return {
    type: GET_DATA,
    payload
   }
}

export const postDataToReducer = (payload) =>{
    return {
     type: POST_DATA,
     payload
    }
 }

export const deleteData = (payload) =>{
   return {
    type: DELETE_DATA,
    payload
   }
}
export const updateData = (payload) =>{
   return {
    type: UPDATE_DATA,
    payload
   }
}