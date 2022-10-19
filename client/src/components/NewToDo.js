import React from 'react'
import axios from "axios"
import  { useGlobalContext } from "../context/GlobalContext"

export const NewToDo = () => {
    const { addToDo } = useGlobalContext();
    const [content, setContent] = React.useState("")

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("/api/todos/new", {content}).then( res => {
            setContent("");
            addToDo(res.data)

        });
    }
    return (
        <div>
            <h1>New ToDo</h1>
            <form onSubmit={onSubmit} className="new">
                <input
                    type="text" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}

                />
                <button className="btn" type="submit" disabled={content.length === 0}>Add</button>
            </form>new
        </div>
    )
}
export default NewToDo