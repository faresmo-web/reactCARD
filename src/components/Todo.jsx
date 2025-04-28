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
// == MODAL ==
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});




export default function Todo({todo,}){
    // === MODAL ===
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [updateTodo, setUpdateTodo] = useState({title: todo.title, details: todo.details})
    function handleDeletClick(){
        setOpen(true)
    }
    function handleUpdateClick(){
        setUpdate(true)
    }

    function handleDeleteModalClose(){
        setOpen(false)
    }
    function handleUpdateModalClose(){
        setUpdate(false)
    }
    function handleDeleteConfirm(){
        const updatedTodos = todos.filter((t)=>{
            return t.id != todo.id
        })
        setTodos(updatedTodos)
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
    }
    function handleUpdateConfirm(){
        const updatedTodos = todos.map((t)=>{
            if(t.id == todo.id){
                return{...t, title: updateTodo.title, details: updateTodo.details}
            }else{
                return t
            }
        })
        setTodos(updatedTodos)
        setUpdate(false)
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
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
        {/* === DELETE MODAL === */}
        <Dialog
        style={{direction: "rtl",}}
        onClose={handleDeleteModalClose}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle style={{fontSize: "27px"}}>هل انت متأكد من رغبتك في الحذف المهمة ؟</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" style={{fontSize: "25px"}}>
                    لأ يمكن التراجع عن الحذف بعد إتمامة
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteModalClose} >إغلاق</Button>
                <Button onClick={handleDeleteConfirm} >نعم؛ قوم الحذف</Button>
            </DialogActions>
        </Dialog>
        {/* === // DELETE MODAL // === */}
        {/* =================================================================================== */}
        {/* === UPDATE MODAL === */}
        <Dialog
        style={{direction: "rtl",}}
        open={update}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleUpdateModalClose}
        // aria-describedby="alert-dialog-slide-description"
        >
                <DialogTitle>تعديل مهمة </DialogTitle>
                <DialogContent>
                
                <TextField
                    autoFocus
                    required
                    margin="dense" 
                    id="name"
                    name="email"
                    label="عنوان المهمة"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={updateTodo.title}
                    onChange={(e)=>{
                        setUpdateTodo({...updateTodo, title: e.target.value})
                    }}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense" 
                    id="name"
                    name="email"
                    label="تفاصيل المهمة"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={updateTodo.details}
                    onChange={(e)=>{
                        setUpdateTodo({...updateTodo, details: e.target.value})
                    }}
                /> 
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateModalClose}>إغلاق</Button>
                    <Button  onClick={handleUpdateConfirm} >تحديث</Button>
                </DialogActions>
        </Dialog>
        {/* === // UPDATE MODAL // === */}
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