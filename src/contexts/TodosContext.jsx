import { createContext, useReducer, useContext  } from "react";
import todosReducer from '../reducers/todosReducer';

export const TodosContext = createContext([])
export const DispatchContext = createContext(null)
const TodosProvider = ({children})=>{
    const [todos, directionTodos] = useReducer(todosReducer, [])
    return(
        <TodosContext.Provider value={todos}>
            <DispatchContext.Provider value={directionTodos}>
                {children}
            </DispatchContext.Provider>
        </TodosContext.Provider>
    )
}
export const useTodos = ()=>{
    return useContext(TodosContext)
}
export const useTodoDispatch = ()=>{
    return useContext(DispatchContext)
}
export default TodosProvider

// export const TodosContext = createContext([])