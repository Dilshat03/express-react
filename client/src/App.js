import React, {useEffect, useState} from 'react';
import axios from "axios";

const App = () => {
    const [tasks, setTasks] = useState([])
    const [nameTask,setNameTask] = useState('')
    useEffect(() => {
        axios('/api/tasks')
            .then(({data})=>setTasks(data))
    }, [])
    const handleChange = (e) => {
      setNameTask(e.target.value)
    }
    const addTask = () => {
    const nameItem =  {
      title: nameTask
    }
        axios.post('/api/tasks', nameItem)
            .then(({data}) => setTasks([...tasks, data]))
        setNameTask('')
    }
    const handleDelete = (id) => {
        axios.delete(`/api/tasks/${id}`)
            .then(() => setTasks(tasks.filter(el => el._id !== id)))

    }
    return (
        <div className='row offset-md-4 my-5'>
           <div className="col-6">
              <div className="d-flex mb-4">
                  <input type="text" className='input-group me-3' onChange={handleChange} value={nameTask}/>
                  <button onClick={addTask} className='btn btn-primary'>Добавить</button>
              </div>
               <div className="group">
                   {
                       tasks.map(el=>
                           <div className='d-flex justify-content-between mb-2'>
                               <h5 key={el._id}>{el.title}</h5>
                               <button onClick={()=>handleDelete(el._id)} className='btn btn-success'><i className='bx bxs-trash'></i></button>
                           </div>
                       )
                   }
               </div>
           </div>
        </div>
    );
};

export default App;