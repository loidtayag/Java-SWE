import styled from "styled-components";
import React, {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { iBoard, iStatus, iSubtask, iTask } from "../iDatabase";

const TaskAdd = () => {
  let [isOverlay, setIsOverlay] = useState(false);

  return (
    <>
      <Button
        myOnClick={() => {
          setIsOverlay(true);
        }}
      >
        Add Task
      </Button>
      {isOverlay && <Overlay className={"foo"} setIsOverlay={setIsOverlay} />}
    </>
  );
};

const Button = styled.button.attrs((props: { myOnClick: () => void }) => ({
  onClick: props.myOnClick,
}))<{ myOnClick: () => void }>``;

const getStatus = () => {
  let name: string[] = [];
  let boardsString = localStorage.getItem("boards");
  if (boardsString != null) {
    let boardsObject: iBoard[] = JSON.parse(boardsString);
    boardsObject = boardsObject.filter(
      (boardObject: iBoard) => boardObject.name === "Demo"
    );
    let board: iBoard = boardsObject[0];
    if (board != null) {
      board.status?.forEach((status: iStatus) => {
        name.push(status.name);
      });
    }
  }
  return name;
};

const Overlay = styled(
  (props: { className: string; setIsOverlay: (value: boolean) => void }) => {
    const info = useRef<{
      title: string;
      desc: string;
      subtasks: string[];
      status: string;
    }>({
      title: "",
      desc: "",
      subtasks: [],
      status: getStatus()[0],
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
            handleDelete(0, subtasks, setSubtasks, info);
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
  left: 35vw;
  background-color: #2c2c38;
`;

const StatusOptions = () => {
  let key = 0;
  return (
    <>
      {getStatus().map((status: string) => (
        <option value={status} key={key++}>
          {status}
        </option>
      ))}
    </>
  );
};

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

const demo = (set: Dispatch<SetStateAction<ReactNode[]>>) => {
  set([]);
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
  let boardsString = localStorage.getItem("boards");
  if (boardsString != null) {
    let boardsObject: iBoard[] = JSON.parse(boardsString);
    //Finding board
    for (let i = 0; i < boardsObject.length; i++) {
      if (boardsObject[i].name === "Demo") {
        //Found board
        let board: iBoard = boardsObject[i];
        //Finding status
        // @ts-ignore
        for (let j = 0; j < board.status?.length; j++) {
          //Found status
          // @ts-ignore
          if (board.status[j].name === info.current.status) {
            // @ts-ignore
            let status: iStatus = board.status[j];
            let subTasks: iSubtask[] = info.current.subtasks.map(
              (subtask: string) => ({ desc: subtask, finished: false })
            );
            let task: iTask = {
              title: info.current.title,
              desc: info.current.desc,
              subtasks: subTasks,
            };
            // @ts-ignore
            boardsObject[i].status[j].tasks.push(task);
            break;
          }
        }
        localStorage.setItem("boards", JSON.stringify(boardsObject));
        break;
      }
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
          handleSubtasks(props.subTasks, props.setSubtasks, props.info);
        }}
      >
        + Add New Subtask
      </button>
    </>
  );
};

//Create an array of buttons and whenever a button is clicked, it deletes itself and using its own index, it deletes from
//the <input/> array as well
const handleSubtasks = (
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
          handleDelete(subTasks.length - 1, subTasks, setSubtasks, info);
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

const handleDelete = (
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
