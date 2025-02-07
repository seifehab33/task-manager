export interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
  end_at: string;
  status: "Pending" | "InProgress" | "Completed";
  priority: "P0" | "P1" | "P2";
  author_name: string; // Now included!
}
export type NewTask = Omit<Task, "id" | "created_at" | "author_name">;
