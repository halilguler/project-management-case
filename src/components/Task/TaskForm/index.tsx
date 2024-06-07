/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row } from "react-bootstrap";
import PMTextField from "../../common/PMTextField";
import PMSelect from "../../common/PMSelect";
import { useEffect, useState } from "react";
import { TasksType } from "../../../types/types";
import PMModal from "../../common/PMModal";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import { setModal } from "../../../features/modalSlice";
import {
  addTask,
  resetTaskForm,
  taskUpdated,
} from "../../../features/homeSlice";

const TaskForm = () => {
  const [validated, setValidated] = useState(false);
  const { columnId } = useAppSelector((state) => state.homeSlice);
  const { taskFormState } = useAppSelector((state) => state.homeSlice);
  const { isOpen } = useAppSelector((state) => state.modalSlice);
  const dispatch = useAppDispatch();
  const [taskInfo, setTaskInfo] = useState<TasksType>({
    id: "",
    content: "",
    description: "",
    taskType: "",
  });

  useEffect(() => {
    setTaskInfo({
      id: taskFormState.id,
      content: taskFormState.content,
      description: taskFormState.description,
      taskType: taskFormState.taskType,
    });
  }, [taskFormState]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ) => {
    const { name, value } = e.target;
    setTaskInfo({
      ...taskInfo,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      if (taskInfo.id !== undefined && taskInfo.id !== "") {
        dispatch(taskUpdated({ task: formValues }));
      } else {
        dispatch(addTask({ columnId, task: formValues }));
      }
      setTaskInfo({
        id: "",
        content: "",
        description: "",
        taskType: "",
      });
      setValidated(false);
      dispatch(setModal(false));
      return;
    }
    setValidated(true);
  };

  return (
    <PMModal
      show={isOpen}
      modalTitle="Add Task"
      handleClick={() => {}}
      handleClose={() => {
        dispatch(resetTaskForm());
        dispatch(setModal(false));
      }}
    >
      <Form noValidate validated={validated} onSubmit={onSubmit} id="taskForm">
        <PMTextField
          name="id"
          className="mb-2 d-none"
          placeholder="Enter id"
          controlId="id"
          type="hidden"
          value={taskInfo?.id || ""}
          as={Col}
        />
        <Row>
          <Col>
            <PMTextField
              label="Task Content"
              name="content"
              className="mb-2"
              placeholder="Enter task content"
              controlId="taskContent"
              type="text"
              required={true}
              value={taskInfo?.content || ""}
              as={Col}
              onChange={(e: any) => {
                handleOnChange(e);
              }}
            />
            <PMTextField
              label="Task Description"
              name="description"
              className="mb-2"
              placeholder="Enter task description"
              controlId="taskDescription"
              type="text"
              required={true}
              value={taskInfo?.description || ""}
              as={Col}
              onChange={(e: any) => {
                handleOnChange(e);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <PMSelect
              label="Task Type"
              className="mb-2"
              name="taskType"
              controlId="taskType"
              required
              value={taskInfo?.taskType || ""}
              options={[
                { id: "1", value: "Task" },
                { id: "2", value: "Bug" },
              ]}
              onChange={(e: any) => {
                handleOnChange(e);
              }}
            />
          </Col>
        </Row>
      </Form>
    </PMModal>
  );
};

export default TaskForm;
