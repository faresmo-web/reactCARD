import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'; 
// == ICONS ==
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
// == // ICONS // ==
import { useContext, useState } from 'react';
import { TodosContext } from '../contexts/TodosContext';
// import { v4 as uuidv4 } from 'uuid';
export default function Todo({todo, showDelete, showUpdate}){
    // === MODAL ===
    
    const [updateTodo, setUpdateTodo] = useState({title: todo.title, details: todo.details})
    function handleDeletClick(){
        showDelete(todo)
    }
    function handleUpdateClick(){
        showUpdate(todo)
    }
    // =============================================================================================================




    const { todos, setTodos} = useContext(TodosContext)
    function handleCheckClick(){
        const updatedTodos = todos.map((t)=>{
            if(t.id == todo.id){
                // if(t.isCompleted == true){
                //     t.isCompleted = false
                // }else{
                //     t.isCompleted = true
                // }
                t.isCompleted = !t.isCompleted
            }
            return t
        })
        setTodos(updatedTodos)
        localStorage.setItem("todos", JSON.stringify(updatedTodos))

    }
    return(
    <>
        
        
        <Card sx={{ minWidth: 275, backgroundColor: "#283593", color: "#FFF", marginTop: 5 }} className='todoCard' >
            <CardContent>
                
                <Grid container spacing={2} >
                    <Grid size={8} >
                        <Typography variant='h5' style={{textDecoration: todo.isCompleted?  "line-through" : "none"}}>
                            {todo.title}
                        </Typography>
                        <Typography variant='h6'>
                            {todo.details}
                        </Typography>
                    </Grid>
                    <Grid size={4}  display="flex" justifyContent="space-around" alignItems="center">
                        {/* === CHECKICON === */}
                        <IconButton onClick={()=>{
                            handleCheckClick()
                        }} className='iconButton' aria-label="check" style={{
                            color: todo.isCompleted? "white" : "#8bc34a",
                            backgroundColor: todo.isCompleted ? "#8bc34a" : "white",
                            border: "solid 3px #8bc34a"
                        }}>
                            <CheckIcon />
                        </IconButton>
                        {/* === // CHECKICON // === */}
                        {/* === EDITICON === */}
                        <IconButton onClick={handleUpdateClick} className='iconButton' aria-label="check" style={{
                            color: "#1769aa",
                            backgroundColor: "white",
                            border: "solid 3px #1769aa"
                        }}>
                            <ModeEditOutlinedIcon/>
                        </IconButton>
                        {/* === // EDITICON // === */}
                        {/* === DELETEICON === */}
                        <IconButton onClick={handleDeletClick} className='iconButton' aria-label="check" style={{
                            color: "#b23c17",
                            backgroundColor: "white",
                            border: "solid 3px #b23c17"
                        }}>
                            <DeleteOutlineOutlinedIcon />
                        </IconButton>
                        {/* === // DELETEICON // === */}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </>
    )
}