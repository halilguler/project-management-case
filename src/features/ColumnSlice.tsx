/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, current } from "@reduxjs/toolkit";

interface Task {
  id: string;
  content: string;
  description: string;
  taskType: string;
  taskFile: string;
  taskDate: string;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface ColumnState {
  columnId?: string;
  editId?: string;
  data: {
    tasks: {
      [key: string]: Task;
    };
    columns: {
      [key: string]: Column;
    };
    columnOrder: string[];
  };
  taskFormState: Task;
}

const initialState: ColumnState = {
  editId: "",
  columnId: "",
  taskFormState: [] as any,
  data: {
    tasks: {
      "task-1": {
        id: "task-1",
        content: "Take out the garbage",
        description: "Take out the garbage",
        taskType: "Task",
        taskFile: "File",
        taskDate: "Date",
      },
      "task-2": {
        id: "task-2",
        content: "Watch my favorite show",
        description: "Watch my favorite show",
        taskType: "Task",
        taskFile: "File",
        taskDate: "Date",
      },
      "task-3": {
        id: "task-3",
        content: "Charge my phone",
        description: "Charge my phone",
        taskType: "Task",
        taskFile: "File",
        taskDate: "Date",
      },
      "task-4": {
        id: "task-4",
        content: "Cook dinner",
        description: "Cook dinner",
        taskType: "Task",
        taskFile: "File",
        taskDate: "Date",
      },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do",
        taskIds: ["task-1", "task-2", "task-3", "task-4"],
      },
    },
    columnOrder: ["column-1"],
  },
};

const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setEditId: (state, action) => {
      state.editId = action.payload.id;
    },
    setColumnId: (state, action) => {
      state.columnId = action.payload.id;
    },
    addColumnAndOrder: (state, action) => {
      const newColumnId = `column-${state.data.columnOrder.length + 1}`;
      const newColumn = {
        id: newColumnId,
        title: action.payload.title,
        taskIds: [],
      };
      const newColumnOrder = [...state.data.columnOrder, newColumnId];

      state.data.columnOrder = [...state.data.columnOrder, newColumnId];
      state.data = {
        ...state.data,
        columns: {
          ...state.data.columns,
          [newColumnId]: newColumn,
        },
        columnOrder: newColumnOrder,
      };
    },

    moveColumn: (state, action) => {
      const { source, destination, draggableId } = action.payload;
      const newOrder = [...state.data.columnOrder];
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, draggableId);
      state.data.columnOrder = newOrder;
    },

    moveTaskInSameColumn: (state, action) => {
      const { source, destination, draggableId } = action.payload;
      const column = state.data.columns[source.droppableId];
      const taskIds = [...column.taskIds];
      taskIds.splice(source.index, 1);
      taskIds.splice(destination.index, 0, draggableId);
      state.data.columns[source.droppableId].taskIds = taskIds;
    },

    moveTaskToDifferentColumn: (state, action) => {
      const { source, destination, draggableId } = action.payload;
      const start = state.data.columns[source.droppableId];
      const end = state.data.columns[destination.droppableId];
      const startTaskIds = [...start.taskIds];
      const endTaskIds = [...end.taskIds];
      startTaskIds.splice(source.index, 1);
      endTaskIds.splice(destination.index, 0, draggableId);
      state.data.columns[source.droppableId].taskIds = startTaskIds;
      state.data.columns[destination.droppableId].taskIds = endTaskIds;
    },

    deleteColumn: (state, action) => {
      const newColumnOrder = state.data.columnOrder.filter(
        (column) => column !== action.payload
      );
      delete state.data.columns[action.payload];
      state.data.columnOrder = newColumnOrder;
    },

    onTitleChange: (state, action) => {
      const { id, value } = action.payload;
      state.data.columns[id].title = value;
    },
    addTask: (state, action) => {
      const { columnId, task } = action.payload;
      const newTask = {
        id: `task-${Object.keys(state.data.tasks).length + 1}`,
        content: task.content,
        description: task.description,
        taskType: task.taskType,
        taskFile: task.taskFile,
        taskDate: task.taskDate,
      };
      state.data.columns[columnId].taskIds.push(newTask.id);
      state.data.tasks[newTask.id] = newTask;
      state.data.tasks[task.id] = task;
    },
    deleteTask: (state, action) => {
      const { columnId, taskId } = action.payload;
      const column = state.data.columns[columnId];
      const newTaskIds = column.taskIds.filter((id) => id !== taskId);
      state.data.columns[columnId].taskIds = newTaskIds;
      delete state.data.tasks[taskId];
      state.data = {
        ...state.data,
        tasks: {
          ...state.data.tasks,
        },
      };
    },
    getTask: (state, action) => {
      const { taskId } = action.payload;
      const task = current(state.data.tasks)[taskId];
      state.taskFormState = task;
    },
    taskUpdated: (state, action) => {
      const { task } = action.payload;
      state.data.tasks[task.id] = task;
    },
  },
});

export const {
  setEditId,
  setColumnId,
  addColumnAndOrder,
  addTask,
  deleteTask,
  deleteColumn,
  onTitleChange,
  setData,
  moveColumn,
  moveTaskInSameColumn,
  moveTaskToDifferentColumn,
  taskUpdated,
  getTask,
} = columnSlice.actions;

const reducer = columnSlice.reducer;
export default reducer;
