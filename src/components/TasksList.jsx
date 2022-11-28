import { useGetTasksQuery, useDeleteTaskMutation, useUpdateTaskMutation } from "../api/apiSlide";

function TasksList() {
  const { data: tasks, isError, isLoading, error } = useGetTasksQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  if (isLoading) {
    return <div>Loading... </div>;
  } else if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul>
      {tasks.map((task, i) => {
        return (
          <li key={i}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <input type="checkbox" id={task.id} 
            checked={task.completed}
            onChange={(e) => updateTask({
                ...task, 
                completed: e.target.checked
            })} />
            <label htmlFor={task.id}>Completed</label>
          </li>
        );
      })}
    </ul>
  );
}

export default TasksList;
