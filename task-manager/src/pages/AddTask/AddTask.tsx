import { useState } from "react";
import { InputField, SelectField } from "../../components";
import { NewTask } from "../../types/Task";
import { useCreateTask } from "../../customHooks/usePostTasks";

const AddTask: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];

  const [taskData, setTaskData] = useState<NewTask>({
    title: "",
    description: "",
    created_at: today,
    end_at: today,
    status: "Pending",
    priority: "P0",
  });
  const resetTaskData = () => {
    setTaskData({
      title: "",
      description: "",
      created_at: today,
      end_at: today,
      status: "Pending",
      priority: "P0",
    });
  };
  const { createTask, isPending } = useCreateTask(resetTaskData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTaskData({ ...taskData, [e.target.id]: e.target.value });
  };

  const handleAddTask = () => {
    createTask(taskData);
  };

  return (
    <div className="flex flex-col items-center gap-5 p-5 sm:p-10">
      <h1 className="text-3xl font-bold text-center">Add New Task</h1>
      <div className="flex flex-col gap-5 w-full justify-center items-center">
        <InputField
          label="Title"
          id="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Task Title"
        />
        <InputField
          label="Description"
          id="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Task Description"
        />
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 w-full sm:w-[20rem] lg:w-[30rem]">
          <InputField
            label="Start Date"
            id="start_date"
            type="date"
            value={taskData.created_at}
            onChange={handleChange}
          />
          <InputField
            label="End Date"
            id="end_date"
            type="date"
            value={taskData.end_at}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:gap-10 sm:w-[20rem] lg:w-[30rem]">
          <SelectField
            label="Status"
            id="status"
            value={taskData.status}
            onChange={handleChange}
            options={["Pending", "InProgress", "Completed"]}
          />
          <SelectField
            label="Priority"
            id="priority"
            value={taskData.priority}
            onChange={handleChange}
            options={["P0", "P1", "P2"]}
          />
        </div>
        <button
          className="w-full sm:w-[20rem] text-center bg-[#6366f1] text-white py-3 rounded-md xl:w-[30rem] flex justify-center items-center gap-2"
          onClick={handleAddTask}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-4 border-white border-t-transparent"></div>
              Adding Task...
            </>
          ) : (
            "Add Task"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddTask;
