import { useEffect, useState } from "react";
import { useGetTasks } from "../../customHooks/useGetTasks";
import style from "./style.module.css";
import { LoadingSpinner, NotFound } from "../../components";
import { TaskItem } from "../../components"; // Import the TaskItem component
import { Pagination } from "../../components"; // Import the Pagination component

// Function to generate a random hex color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const itemsPerPage = 5;

function Home() {
  const { boxShadow } = style;
  const { tasks, isLoading, error } = useGetTasks();
  const [taskColors, setTaskColors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Generate random colors once when tasks are loaded
  useEffect(() => {
    if (tasks.length > 0 && taskColors.length === 0) {
      const colors = tasks.map(() => getRandomColor());
      setTaskColors(colors);
    }
  }, [tasks, taskColors]);

  // Get the tasks to display based on the current page
  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  // Handle page change
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <div className="my-10 mx-40">
      <div className="heading text-5xl font-bold text-center mb-3">
        Task Board
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

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Home;
