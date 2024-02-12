import logo from './logo.svg';
import './App.css';
import {useRef, useState} from "react";
import useScroll from "./useScroll";

function App() {
    const [todos, setTodos] = useState([])
    const [page, setPage] = useState(1)
    const limit = 20

    const parentRef = useRef()
    const childRef = useRef()

    useScroll(parentRef, childRef, () => fetchTodos(page, limit))

    function fetchTodos(page, limit) {
        fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`)
            .then(res => res.json())
            .then(json => {
                setTodos(prev => [...json, ...prev])
                setPage(prev => prev + 1)
                parentRef.current?.scrollBy(0, 30)
            })
    }

    return (
        <div ref={parentRef} style={{height: '70vh', background: "lightgray", overflow: "scroll"}}>
            <div ref={childRef} style={{height: 20, background: 'green'}} />
            {todos && todos.map(todo =>
                <div key={todo.id} style={{padding: 30, border: '2px solid black'}}>
                    {todo.id}. {todo.title}
                </div>
            )}

        </div>
    );
}

export default App;
