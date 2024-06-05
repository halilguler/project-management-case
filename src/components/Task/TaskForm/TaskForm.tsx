/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row } from "react-bootstrap";
import PMTextField from "../../common/PMTextField/PMTextField";
import PMSelect from "../../common/PMSelect/PMSelect";
import { useState } from "react";
import { TasksType } from "../../../types/types";
import PMModal from "../../common/PMModal/PMModal";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import { setModal } from "../../../features/ModalSlice";
import { addTask } from "../../../features/ColumnSlice";

type Props = {
  columnId: string;
};

const TaskForm = (props: Props) => {
  const { columnId } = props;
  const [validated, setValidated] = useState(false);
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.modalSlice);
  const [taskInfo, setTaskInfo] = useState<TasksType>({
    id: "",
    content: "",
    description: "",
    taskType: "",
    taskFile: "",
    taskDate: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name } = e.target;
    const { value } = e.target;
    setTaskInfo({
      ...taskInfo,
      [name]: value,
    });
  };

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    dispatch(addTask({ columnId, task: formValues }));
    dispatch(setModal());
    setTaskInfo({
      id: "",
      content: "",
      description: "",
      taskType: "",
      taskFile: "",
      taskDate: "",
    });

    setValidated(true);
  };

  return (
    <PMModal
      show={isOpen}
      modalTitle="Add Task"
      handleClick={() => {}}
      handleClose={() => dispatch(setModal())}
    >
      <Form noValidate validated={validated} onSubmit={onSubmit} id="taskForm">
        <PMTextField
          name="id"
          className="mb-2 d-none"
          placeholder="Enter id"
          controlId="id"
          type="hidden"
          value={columnId}
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
            <PMTextField
              label="Task File"
              name="taskFile"
              className="mb-2"
              placeholder="Enter task file"
              controlId="taskFile"
              type="text"
              value={taskInfo?.taskFile || ""}
              as={Col}
              onChange={(e: any) => {
                handleOnChange(e);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <PMTextField
              label="Task Date"
              name="taskDate"
              className="mb-2"
              placeholder="Enter task date"
              controlId="taskDate"
              type="text"
              value={taskInfo?.taskDate || ""}
              as={Col}
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
