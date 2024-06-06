export enum DroppableEnum {
  COLUMN = "column",
  TASK = "task",
}

export enum TaskTypeEnum {
  TASK = "Task",
  BUG = "Bug",
}

export type TasksType = {
  id?: string;
  content?: string;
  description?: string;
  taskType?: string;
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
