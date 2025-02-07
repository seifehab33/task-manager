import { useEffect, useState, useMemo } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectInProgressTasks } from "../../store/Tasks/tasksSlice";
import { Task } from "../../types/Task";
import style from "../Home/style.module.css";
import { Pagination, TaskItem } from "../../components";

const ProgressTask: React.FC = () => {
  const { boxShadow } = style;
  const inProgressTask: Task[] = useAppSelector(selectInProgressTasks);
  const [taskColors, setTaskColors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Generate random color for each task (only once when tasks are loaded)
  useEffect(() => {
    if (inProgressTask.length > 0) {
      const colors = inProgressTask.map(() => getRandomColor());
      setTaskColors(colors);
    }
  }, [inProgressTask]);

  // Generate random color function
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const itemsPerPage = 5;

  // Memoize pagination logic to prevent recalculation on each render
  const { currentTasks, totalPages } = useMemo(() => {
    const indexOfLastTask = currentPage * itemsPerPage;
    const indexOfFirstTask = indexOfLastTask - itemsPerPage;
    const currentTasks = inProgressTask.slice(
      indexOfFirstTask,
      indexOfLastTask
    );
    const totalPages = Math.ceil(inProgressTask.length / itemsPerPage);
    return { currentTasks, totalPages };
  }, [inProgressTask, currentPage]);

  // Handle pagination changes
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="my-10 mx-40">
      <div className="heading text-5xl font-bold text-center mb-3">
        InProgress Tasks Board
      </div>
      <div className="grid grid-cols-3 gap-3">
        {currentTasks.map((task, index) => {
          const randomColor = taskColors[index];
          return (
            <TaskItem
              key={task.id}
              task={task}
              randomColor={randomColor}
              boxShadow={boxShadow}
            />
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ProgressTask;
