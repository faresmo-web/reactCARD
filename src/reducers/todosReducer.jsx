import { v4 as uuidv4 } from 'uuid';








export default function todosReducer(currentTodos, action){
    switch(action.type){
        case "addad":{
            const newTodo = {
            id: uuidv4(),
            title: action.payload.title,
            details: "",
            isCompleted: false
        }
            const updatedTodos = [...currentTodos, newTodo]
            localStorage.setItem("todos", JSON.stringify(updatedTodos))
            return updatedTodos
        }
        case "delete":{
            const updatedTodos = currentTodos.filter((t)=>{
            return t.id != action.payload.id
        })
        
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
        
        
        return updatedTodos
        }
        case "updated":{
            const updatedTodos = currentTodos.map((t)=>{
                if(t.id == action.payload.id){
                    return{...t, title: action.payload.title, details: action.payload.details}
                }else{
                    return t
                }
            })
            localStorage.setItem("todos", JSON.stringify(updatedTodos))
            return updatedTodos
        }
        case "get":{
            const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? []
            return storageTodos
        }
        case "completed":{
            const updatedTodos = currentTodos.map((t)=>{
            if(t.id == action.payload.id){
                const updatedTodo = {
                    ...t,
                    isCompleted: !t.isCompleted
                }
                return updatedTodo
            }
            return t
        })
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
        
        return updatedTodos
        
        }
        default:{
            throw Error("Unknown action: " + action.type)
        }
    }
    return []
}