import styled from "styled-components";
import React, {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { iBoard, iStatus, iSubtask, iTask } from "../../../utils/iDatabase";
import {
  getBoards,
  getSelectedBoard,
  spacing,
  Text,
  theme,
} from "../../../utils/helpers";

const TaskAdd = (props: { setSelectedBoard: (value: iBoard) => void }) => {
  let [isOverlay, setIsOverlay] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOverlay(true);
        }}
      >
        <Text>+ Add New Task</Text>
      </Button>
      {isOverlay && (
        <Overlay
          className={"foo"}
          setIsOverlay={setIsOverlay}
          setSelectedBoard={props.setSelectedBoard}
        />
      )}
    </>
  );
};

const Button = styled.button`
  color: #ffffff;
  background-color: ${theme.clickable};
  border: none;
  width: 18ch;
  height: 5ch;
  border-radius: 2.5ch;
  margin-right: ${spacing};
  cursor: pointer;
`;

interface iTaskInfo {
  title: string;
  desc: string;
  subtasks: string[];
  status: string;
}

const getStatuses = () => {
  // @ts-ignore
  return getSelectedBoard().status.map((status: iStatus) => status.name);
};

const Overlay = styled(
  (props: {
    className: string;
    setIsOverlay: (value: boolean) => void;
    setSelectedBoard: (value: iBoard) => void;
  }) => {
    const info = useRef<iTaskInfo>({
      title: "",
      desc: "",
      subtasks: [],
      status: getStatuses()[0],
    });
    const [subtasks, setSubtasks] = useState<ReactNode[]>([
      <div key={0}>
        <input
          type="text"
          placeholder="It's always good to take a break to avoid burnout, plus happy employees leads to increased productivity."
          onBlur={(event) => {
            handleSubtask(0, event, info);
          }}
        />
        <button
          type="button"
          onClick={() => {
            handleDeleteSubtask(0, subtasks, setSubtasks, info);
          }}
        >
          <img
            alt="Delete subtask"
            src="/delete-task.svg"
            style={{ width: "3rem", height: "auto" }}
          />
        </button>
      </div>,
    ]);

    return (
      <form
        onSubmit={(event) => {
          handleSubmit(event, props.setIsOverlay, info);
          props.setSelectedBoard(getSelectedBoard());
        }}
        className={props.className}
        style={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          padding: "2.5rem",
          justifyContent: "space-between",
          minHeight: "7rem",
        }}
      >
        <h2>Add New Task</h2>
        <div>
          <h3>Title</h3>
          <input
            id="title"
            type="text"
            required={true}
            placeholder="Take coffee break."
            onBlur={(event) => {
              handleTitle(event, info);
            }}
          />
        </div>
        <div>
          <h3>Description</h3>
          <input
            id="desc"
            type="text"
            required={true}
            placeholder="It's always good to take a break to avoid burnout, plus happy employees leads to increased productivity."
            onBlur={(event) => {
              handleDesc(event, info);
            }}
          />
        </div>
        <div>
          <h3>Subtasks</h3>
          <Subtasks subTasks={subtasks} setSubtasks={setSubtasks} info={info} />
        </div>
        <div>
          <h3>Status</h3>
          <select
            id="status"
            onBlur={(event) => {
              handleStatus(event, info);
            }}
          >
            <StatusOptions />
          </select>
        </div>
        <input type="submit" value="Create Task" />
      </form>
    );
  }
)`
  position: fixed;
  width: 30vw;
  top: 43vh;
  left: 35vw;
  background-color: #2c2c38;
`;

const handleTitle = (
  input: React.FocusEvent<HTMLInputElement>,
  info: MutableRefObject<{
    title: string;
    desc: string;
    subtasks: string[];
    status: string;
  }>
) => {
  info.current.title = input.target.value;
};

const handleDesc = (
  input: React.FocusEvent<HTMLInputElement>,
  info: MutableRefObject<{
    title: string;
    desc: string;
    subtasks: string[];
    status: string;
  }>
) => {
  info.current.desc = input.target.value;
};

const handleSubtask = (
  index: number,
  input: React.FocusEvent<HTMLInputElement>,
  info: MutableRefObject<{
    title: string;
    desc: string;
    subtasks: string[];
  }>
) => {
  info.current.subtasks[index] = input.target.value;
};

const handleStatus = (
  input: React.FocusEvent<HTMLSelectElement>,
  info: MutableRefObject<{
    title: string;
    desc: string;
    subtasks: string[];
    status: string;
  }>
) => {
  info.current.status = input.target.value;
};

const StatusOptions = () => {
  let key = 0;
  return (
    <>
      {getStatuses().map((status: string) => (
        <option value={status} key={key++}>
          {status}
        </option>
      ))}
    </>
  );
};

const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  setIsOverlay: (value: boolean) => void,
  info: MutableRefObject<{
    title: string;
    desc: string;
    subtasks: string[];
    status: string;
  }>
) => {
  const boards: iBoard[] = getBoards();
  const selectedBoard: iBoard = getSelectedBoard();
  //Finding board
  for (let i = 0; i < boards.length; i++) {
    //Found board
    if (boards[i].name === selectedBoard.name) {
      //Finding status
      if (selectedBoard.status) {
        for (let j = 0; j < selectedBoard.status.length; j++) {
          //Found status
          if (selectedBoard.status[j].name === info.current.status) {
            let subTasks: iSubtask[] = info.current.subtasks.map(
              (subtask: string) => ({ desc: subtask, finished: false })
            );
            let task: iTask = {
              title: info.current.title,
              desc: info.current.desc,
              subtasks: subTasks,
            };
            // @ts-ignore
            boards[i].status[j].tasks.push(task);
            localStorage.setItem("boards", JSON.stringify(boards));
            break;
          }
        }
      }
      break;
    }
  }

  event.preventDefault();
  setIsOverlay(false);
};

const Subtasks = (props: {
  subTasks: ReactNode[];
  setSubtasks: Dispatch<SetStateAction<ReactNode[]>>;
  info: MutableRefObject<{ title: string; desc: string; subtasks: string[] }>;
}) => {
  return (
    <>
      {props.subTasks}
      <button
        type="button"
        onClick={() => {
          handleAddSubtask(props.subTasks, props.setSubtasks, props.info);
        }}
      >
        + Add New Subtask
      </button>
    </>
  );
};

const handleAddSubtask = (
  subTasks: ReactNode[],
  setSubtasks: Dispatch<SetStateAction<ReactNode[]>>,
  info: MutableRefObject<{ title: string; desc: string; subtasks: string[] }>
) => {
  subTasks.push(
    <div key={subTasks.length}>
      <input
        type="text"
        placeholder="It's always good to take a break to avoid burnout, plus happy employees leads to increased productivity."
        onBlur={(event) => {
          handleSubtask(subTasks.length - 1, event, info);
        }}
      />
      <button
        type="button"
        onClick={() => {
          handleDeleteSubtask(subTasks.length - 1, subTasks, setSubtasks, info);
        }}
      >
        <img
          alt="Delete subtask"
          src="/delete-task.svg"
          style={{ width: "3rem", height: "auto" }}
        />
      </button>
    </div>
  );
  setSubtasks(subTasks.concat([]));
};

const handleDeleteSubtask = (
  index: number,
  subTasks: ReactNode[],
  setSubtasks: Dispatch<SetStateAction<ReactNode[]>>,
  info: MutableRefObject<{ title: string; desc: string; subtasks: string[] }>
) => {
  subTasks.splice(index, 1);
  info.current.subtasks.splice(index, 1);
  setSubtasks(subTasks.concat([]));
};

export default TaskAdd;
