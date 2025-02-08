// TaskItem.tsx
import React from "react";

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    description: string;
    priority: string;
    created_at: string;
    end_at: string;
    status: string;
  };
  randomColor: string;
  boxShadow: string;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  randomColor,
  boxShadow,
}) => {
  const name = localStorage.getItem("name");

  return (
    <div
      className={`border px-7 py-14 flex flex-col gap-3 rounded-lg ${boxShadow}`}
      key={task.id}
    >
      <div
        className="flex h-32 justify-center items-center relative rounded-lg text-center"
        style={{ backgroundColor: randomColor }}
      >
        <p className="capitalize font-extrabold">{task.title}</p>
        <p className="absolute right-3 top-2">{task.priority}</p>
      </div>
      <div className="capitalize text-center">
        <h1>{task.description}</h1>
      </div>
      <div className="date flex justify-between">
        <div className="flex flex-col text-center">
          <h1 className="font-bold">Start Date</h1>
          <p>{new Date(task.created_at).toLocaleDateString()}</p>
        </div>
        <div className="flex flex-col text-center">
          <h1 className="font-bold">End Date</h1>
          <p>{new Date(task.end_at).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="date flex justify-between items-center">
        <p className="text-sm">{name}</p>
        <p
          className="text-white px-3 py-2 rounded-lg font-bold"
          style={{ backgroundColor: randomColor }}
        >
          {task.status}
        </p>
      </div>
    </div>
  );
};

export default TaskItem;
