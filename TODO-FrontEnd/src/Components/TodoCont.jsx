import React from 'react'
function TodoCont({todo, index,deleteTask}) {
  return (

    <div className="ToDo">
    <p>{todo}</p>
    <div className="action">
      <input type="checkbox"/>
      <button onClick={()=>deleteTask(index)}>Delete</button>
    </div>
    </div>
  
  );
}

export default TodoCont;