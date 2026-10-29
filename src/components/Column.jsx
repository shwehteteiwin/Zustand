import "./Column.css";
import Task from "./Task";
import { useStore } from "../store";
import { useMemo, useState } from 'react';
// import {shallow} from 'zustand'

export default function Column({ state }) {
    
    const [text, setText] = useState('');
     const [open, setOpen] = useState(false);
    // const tasks = useStore((store) =>
    //   store.tasks.filter((task) => task.state == state),
    // ); //error တက်လို့ (original)

  // const filtered = useMemo(()=>tasks.filter((task)=>task.state==state),[tasks,state])


  const tasks = useStore((store) => store.tasks);
  const filtered = useMemo(
    () => tasks.filter((task) => task.state == state),
    [tasks, state],
  );

  const addTask =useStore(store=>store.addTask)
const setDraggedTask = useStore(store=>store.setDraggedTask)
const draggedTask = useStore((store)=>store.draggedTask);
const moveTask = useStore((store)=>store.moveTask);



  return (
    <div className="column" onDragOver={
        (e)=>{e.preventDefault();}}
    onDrop={()=>{
        // console.log(draggedTask);
        moveTask(draggedTask,state)
        setDraggedTask(null);
        
    }}
    >
        <div className="titleWrapper">
             <p>{state}</p>
             <button 
            //  onClick={()=>{
            //     addTask("asdsa" + state,state)}}

            onClick={()=>setOpen(true)}
                
                >Add</button>
        </div>
     
      {filtered.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
      {/* <Task title="Todo"/> */}
      {open && 
      (<div className="Modal">
        <div className="modalContent">
            <input onChange={e=>setText(e.target.value)} value={text}/>
            <button onClick={()=>{
                addTask(text,state);
                setText("");
                setOpen(false);
            }}
            >Submit</button>
        </div>
      </div>)}
    </div>
  );
}
