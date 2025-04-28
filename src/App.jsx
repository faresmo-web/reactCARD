
import './App.css'
import TodoList from './components/TodoList'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { TodosContext } from './contexts/TodosContext';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';


const initialTodos = [
  {
      id: uuidv4(),
      title: "قراءة كتاب",
      details: "قراءة كتاب في البرمجة",
      isCompleted: false,
  },
  {
      id: uuidv4(),
      title: "تعلم مهارة جديدة",
      details: "تعلم مهارة جديدة في البرمجة",
      isCompleted: false,
  },
  {
      id: uuidv4(),
      title: "مشاهدة فيديو تعليمي",
      details: "مشاهدة فيديو تعليمي",
      isCompleted:true,
  },
  
]

const theme = createTheme({
  typography: {
    fontFamily: [
      "Alexandria"
    ],
  },
  palette: {
    primary: {
      main: "#00bcd4",
    },
    error: {
      main: "#d50000",
    },
  }
});

function App() {
  const [todos, setTodos] = useState(initialTodos)
  return (
    
    <ThemeProvider theme={theme}>
      <div style={{
        direction: "rtl",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#191b1f",
        height: "100vh",
      }}>
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      
      </div>
    </ThemeProvider>
    
    
  )
}

export default App
