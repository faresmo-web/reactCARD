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
import { TodosContext } from '../contexts/TodosContext';
import { useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';





export default function TodoList() {
  
    const { todos, setTodos} = useContext(TodosContext)
    
    const [titleInput, setTitleInput] = useState("")
    const [displayedTodosType, setDisplayedTodosType] = useState("all")
    // === FILTERATION ===


     // FILTERATION ARRAYS
    const compledTodos = todos.filter((t)=>{
        return t.isCompleted
    })
    const notCompledTodos = todos.filter((t)=>{
        return !t.isCompleted
    })
    let todosToBeRendered = todos

    if(displayedTodosType == "completed"){
        todosToBeRendered = compledTodos
    }else if(displayedTodosType == "non-completed"){
        todosToBeRendered = notCompledTodos
    }else{todosToBeRendered = todos}



    const todosJsx = todosToBeRendered.map((t)=>{
        return <Todo key={t.id} todo={t} />
    })
   
    



    useEffect(()=>{
        const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? []
        setTodos(storageTodos )
    },[])
    function changDisplayedTodosType(e){
        setDisplayedTodosType(e.target.value)
    }

    function handlAddClick(){
        const newTodo = {
            id: uuidv4(),
            title: titleInput,
            details: "",
            isCompleted: false

        }
        const updatedTodos = [...todos, newTodo]
        setTodos(updatedTodos)
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
        setTitleInput("")
    }



    // === FILTER BUTTONS ===
    // const [alignment, setAlignment] = React.useState('web');
    // const handleChange = (event, newAlignment) => {
    //     setAlignment(newAlignment);
    // };
    // === // FILTER BUTTONS // ===


    return (
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
        
    );
}     