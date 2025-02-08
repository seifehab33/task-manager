import { useEffect, useState, useMemo } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectPendingTasks } from "../../store/Tasks/tasksSlice";
import { Task } from "../../types/Task";
import style from "../Home/style.module.css";
import { Pagination, TaskItem } from "../../components";

const PendingTask: React.FC = () => {
  const { boxShadow } = style;
  const pendingTasks: Task[] = useAppSelector(selectPendingTasks);
  const [taskColors, setTaskColors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (pendingTasks.length > 0) {
      const colors = pendingTasks.map(() => getRandomColor());
      setTaskColors(colors);
    }
  }, [pendingTasks]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const itemsPerPage = 5;

  const { currentTasks, totalPages } = useMemo(() => {
    const indexOfLastTask = currentPage * itemsPerPage;
    const indexOfFirstTask = indexOfLastTask - itemsPerPage;
    const currentTasks = pendingTasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(pendingTasks.length / itemsPerPage);
    return { currentTasks, totalPages };
  }, [pendingTasks, currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="my-20 mx-10 lg:mx-40">
      <div className="heading  sm:text-sm md:text-sm lg:text-[15px] xl:text-5xl font-bold text-center mb-3">
        Pending Tasks Board
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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

export default PendingTask;
