
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
// == ICONS ==
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
// == // ICONS // ==
import { useTodoDispatch } from '../contexts/TodosContext';
import { useToast } from '../contexts/ToastContext';
export default function Todo({todo, showDelete, showUpdate}){
    // === MODAL ===
    function handleDeletClick(){
        showDelete(todo)
    }
    const { showHideToast } = useToast()
    function handleUpdateClick(){
        showUpdate(todo)
    }
    // =============================================================================================================




    
    const dispatch = useTodoDispatch()
    function handleCheckClick(){
        dispatch({type: "completed", payload: todo})
        showHideToast("تم التعديل بنجاح")
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