import { useState, useEffect } from 'react';

const Lists = () => {
    const [addTask, setAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [toggledTasks, setToggledTasks] = useState([]);

    useEffect(() => {
        const storedTasks = window.localStorage.getItem('tasks');
        if(storedTasks != null)
        {
            setTasks(JSON.parse(storedTasks));
        }
        
    }, []);

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        console.log('tasks', tasks)
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const changeHandler = (e) => {
        setNewTask(e.target.value);
    };

    const addHandler = () => {
        setAddTask(true);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setTasks([...tasks, newTask]);
        setNewTask('');
        setAddTask(false);
    };

    const deleteHandler = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const toggleStrikethrough = (index) => {
        if (toggledTasks.includes(index)) {
            setToggledTasks(toggledTasks.filter((i) => i !== index));
        } else {
            setToggledTasks([...toggledTasks, index]);
        }
    };

    return (
        <div className="flex-1 flex flex-col justify-center items-center overflow-auto">
            <div className="bg-white max-h-full w-1/2 overflow-y-auto border rounded-md shadow-lg p-5">
                {addTask && (
                    <div className="mb-4">
                        <form onSubmit={submitHandler} className="flex">
                            <input
                                type="text"
                                placeholder="Enter your task"
                                value={newTask}
                                onChange={changeHandler}
                                className="border rounded-l-md p-2 flex-grow"
                            />
                            <button type="submit" className="bg-violet-500 text-white px-4 rounded-r-md">
                                Submit
                            </button>
                        </form>
                    </div>
                )}
                <div className="flex flex-col gap-y-2">
                    {
                        tasks.length > 0 ? (

                            tasks.map((task, index) => (
                                <div key={index} className="flex items-center bg-white border rounded-md p-3 shadow-sm">
                                    <input
                                        type="checkbox"
                                        onChange={() => toggleStrikethrough(index)}
                                        checked={toggledTasks.includes(index)}
                                        className="mr-3"
                                    />
                                    <label
                                        style={{ textDecoration: toggledTasks.includes(index) ? 'line-through' : 'none' }}
                                        className="text-gray-700 font-medium flex-grow"
                                    >
                                        {task}
                                    </label>
                                    <button type="button" onClick={() => deleteHandler(index)} className="text-red-500">
                                        ❌
                                    </button>
                                </div>
                            ))
                        ) : (<div className="text-gray-700 font-medium flex-grow text-center">No tasks are here.</div>)
                    }
                </div>

            </div>
            <button
                type="button"
                onClick={addHandler}
                className="mt-4 relative bottom-8 w-52 py-2 text-center border rounded-full text-white font-bold bg-violet-500 hover:bg-violet-600"
            >
                + Add Task
            </button>
        </div>
    );
};

export default Lists;




