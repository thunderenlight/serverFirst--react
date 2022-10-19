import React, { useState }from "react"
import axios from "axios"
import { useGlobalContext } from  "../context/GlobalContext" 


const ToDoCard = ({ toDo }) => {

    const [content, setContent] = useState(toDo.content)
    const [editing, setEditing] = useState(false)
    const input = React.useRef(null)
    const { toDoComplete, toDoIncomplete, removeToDo } = useGlobalContext();

    const onEdit = (e) => {
        e.preventDefault();
        setEditing(true);
        input.current.focus()
    }

    const deleteToDo =(e) => {
        e.preventDefault()
        axios.delete(`/api/todos/${toDo._id}`).then(() => {
            removeToDo(toDo)
        })
}
    const stopEditing = (e) => {
        if (e){ e.preventDefault()}
        setEditing(false);
        setContent(toDo.content);
    };

    const markAsComplete = (e) => {
        e.preventDefault();
        axios.put(`/api/todos/${toDo._id}/complete`).then((res) => {
            toDoComplete(res.data);
        });
    };

    const markAsIncomplete = e => {
        e.preventDefault();
        axios.put(`/api/todos/${toDo._id}/incomplete`).then((res) => {
            toDoIncomplete(res.data);
        })
    }

    const editToDo = (e) => {

    }
    return (
        <div className={`todo ${toDo.complete ?  "todo--complete" : "todo--incomplete"}`}>
            <input 
                type="checkbox" 
                checked={toDo.complete}
                onChange={!toDo.complete ? markAsComplete : markAsIncomplete}

                />
            <input type="text" ref={input} value={content} readOnly={!editing}
                onChange={(e) => setContent(e.target.value)}

            />
            
            <div className="todo__controls">
                {!editing ? (
                    <> 
                        {!toDo.complete && <button onClick={onEdit}>Edit</button>}
                        <button onClick={deleteToDo}>Delete</button>
                    </>
                ) : (
                    <> 
                        <button onClick={stopEditing}>Cancel</button>
                        <button onClick={editToDo}>Save</button>
                    </>
                )}

            </div>
        </div>
    )
}

export default ToDoCard
