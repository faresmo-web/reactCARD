import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import Grid from '@mui/material/GridLegacy';
import TextField from '@mui/material/TextField';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// === COMPONENTS ===
import Todo from './Todo';

// === OTHER ===
import { useTodos, useTodoDispatch } from '../contexts/TodosContext';
import { useToast } from '../contexts/ToastContext';

import {useState, useEffect, useMemo } from 'react';

// == MODAL ==
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});






export default function TodoList() {

    const todos = useTodos()
    const dispatch = useTodoDispatch()

    const {showHideToast} = useToast()
    
    const [modalTodo, setModalTodo] = useState(null)
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [titleInput, setTitleInput] = useState("")
    const [displayedTodosType, setDisplayedTodosType] = useState("all")
    // === FILTERATION ===

    
    
    

     // FILTERATION ARRAYS
    const compledTodos = useMemo(()=>{
        return todos.filter((t)=>{
            console.log("calling compled todos")
            return t.isCompleted
        })
     }, [todos])

    
    const notCompledTodos = useMemo(()=>{
        return todos.filter((t)=>{
            console.log("calling not compled todos")
            return !t.isCompleted
        })
    }, [todos]) 


    let todosToBeRendered = todos

    if(displayedTodosType == "completed"){
        todosToBeRendered = compledTodos
    }else if(displayedTodosType == "non-completed"){
        todosToBeRendered = notCompledTodos
    }else{todosToBeRendered = todos}



  
   
    



    useEffect(()=>{
        dispatch({type: "get"})
    },[])



   

    // === MODAL ===
    function changDisplayedTodosType(e){
        setDisplayedTodosType(e.target.value)
    }

    function handlAddClick(){
        dispatch({type: "addad", payload: {title: titleInput}})
        setTitleInput("")
        showHideToast(" تم إضافة المهمة بنجاح ")
    }



    // === FILTER BUTTONS ===
    // const [alignment, setAlignment] = React.useState('web');
    // const handleChange = (event, newAlignment) => {
    //     setAlignment(newAlignment);
    // };
    // === // FILTER BUTTONS // ===
    
    function showDeleteModal(todo){
        setModalTodo(todo)
        setOpen(true);
    }
    function showUpdateModal(todo){
        setModalTodo(todo)
        setUpdate(true)
    }
    function handleDeleteModalClose(){
        setOpen(false)
    }
    function handleDeleteConfirm(){
        // console.log(modalTodo)
        dispatch({type: "delete", payload: {id: modalTodo.id}})
        setOpen(false)
        showHideToast("تم الحذف بنجاح")
    }

    function handleUpdateModalClose(){
            setUpdate(false)
        }
        
        function handleUpdateConfirm(){
            dispatch({type: "updated", payload: modalTodo})
            setUpdate(false)
            showHideToast("تم التحديث بنجاح")
        }

    const todosJsx = todosToBeRendered.map((t)=>{
        return <Todo key={t.id} todo={t} showDelete={showDeleteModal} showUpdate={showUpdateModal}/>
    })
    return (
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
                    value={modalTodo?.title}
                    onChange={(e)=>{ 
                        setModalTodo({...modalTodo, title: e.target.value})
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
                    value={modalTodo?.details}
                    onChange={(e)=>{
                        setModalTodo({...modalTodo, details: e.target.value})
                    }}
                /> 
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateModalClose}>إغلاق</Button>
                    <Button  onClick={handleUpdateConfirm} >تحديث</Button>
                </DialogActions>
        </Dialog>
        {/* === // UPDATE MODAL // === */}
            {/* === // DELETE MODAL // === */}
            <Container maxWidth="md" >
                <Card sx={{ minWidth: 275 }} style={{maxHeight: "98vh" , overflowY: "scroll"}}>
                    <CardContent>
                        <Typography variant='h1' style={{ textAlign: "center", fontWeight: "bold" }}>
                            مهامي
                        </Typography>
                        <Divider variant="middle" />
                        {/* ===FILTER BUTTONS === */}
                        <ToggleButtonGroup
                            color="primary"
                            value={displayedTodosType}
                            exclusive
                            onChange={changDisplayedTodosType}
                            aria-label="error"
                            color="error"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "20px",
                                direction: "ltr",
                                
                            }}>
                                <ToggleButton value="non-completed">غير المنجز</ToggleButton>
                                <ToggleButton value="completed">المنجز</ToggleButton>
                                <ToggleButton value="all">الكل</ToggleButton>
                        </ToggleButtonGroup>
                        {/* === // FILTER BUTTONS // === */}

                    {/* === ALL TODOS === */} 
                    {todosJsx}
                    {/* <Todo /> */}
                    {/* === // ALL TODOS // === */}

                    {/* === INPUT + ADD BUTTON === */}
                    <Grid container   style={{marginTop:"30px"}} >
                        <Grid xs={8} display="flex" justifyContent="space-around" alignItems="center" >
                            <TextField id="outlined-basic" label="عنوان المهمة" variant="outlined" color='error' style={{width: "100%",}} value={titleInput} onChange={(e)=>{
                                setTitleInput(e.target.value)
                            }} />
                        </Grid>
                        <Grid xs={4} display="flex" justifyContent="space-around" alignItems="center">
                        <Button variant="contained" color="error" style={{width: "100%", height: "100%", marginRight: "5px"}} onClick={()=>{
                            handlAddClick()
                        }} disabled={titleInput.length == 0} >
                            إضافة
                        </Button>
                        </Grid>
                    </Grid>
                    {/* === // INPUT + ADD BUTTON // === */}

                    </CardContent>
                </Card>
            </Container>
        </>
    );
}     