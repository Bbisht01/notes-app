import { Reducer } from "./reducer";
import {createStore} from "redux"

export const store = createStore(Reducer)