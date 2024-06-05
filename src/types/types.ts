export enum DroppableEnum {
  COLUMN = "column",
  TASK = "task",
}

export type TasksType = {
  id?: string;
  content?: string;
  description?: string;
  taskType?: string;
  taskFile?: string;
  taskDate?: string;
};

export type ColumnType = {
  id: string;
  title: string;
  taskIds: string[];
};

export type ColumnsType = {
  tasks: TasksType[];
  column: ColumnType;
  index: number;
};
