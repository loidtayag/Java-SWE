import styled from "styled-components";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from "react";

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

const Overlay = styled(
  (props: { className: string; setIsOverlay: (value: boolean) => void }) => {
    const [subtasks, setSubtasks] = useState<ReactNode[]>([
      <div key={0}>
        <input
          type="text"
          placeholder="It's always good to take a break to avoid burnout, plus happy employees leads to increased productivity."
          onBlur={() => {
            handleBlur(this);
          }}
        />
        <button
          type="button"
          onClick={() => {
            handleDelete(0, subtasks, setSubtasks);
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
    const info = useRef({ title: "", desc: "", subtasks: [] });

    return (
      <form
        onSubmit={() => {
          handleSubmit(props.setIsOverlay);
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
        <button
          type="button"
          onClick={() => {
            demo(setSubtasks);
          }}
        >
          Hi
        </button>
        <h2>Add New Task</h2>
        <div>
          <h3>Title</h3>
          <input
            id="title"
            type="text"
            required={true}
            placeholder="Take coffee break."
          />
        </div>
        <div>
          <h3>Description</h3>
          <input
            id="desc"
            type="text"
            required={true}
            placeholder="It's always good to take a break to avoid burnout, plus happy employees leads to increased productivity."
          />
        </div>
        <div>
          <h3>Subtasks</h3>
          <Subtasks subTasks={subtasks} setSubtasks={setSubtasks} />
        </div>
        <div>
          <h3>Status</h3>
          <select id="status">
            <option value="TODO">TODO</option>
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

const handleBlur = (input: React.FocusEvent<HTMLInputElement>) => {
  console.log(input.target.value);
};

const demo = (set: Dispatch<SetStateAction<ReactNode[]>>) => {
  set([]);
};

const handleSubmit = (setIsOverlay: (value: boolean) => void) => {
  setIsOverlay(false);
};

const Subtasks = (props: {
  subTasks: ReactNode[];
  setSubtasks: Dispatch<SetStateAction<ReactNode[]>>;
}) => {
  return (
    <>
      {props.subTasks}
      <button
        type="button"
        onClick={() => {
          handleSubtasks(props.subTasks, props.setSubtasks);
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
  setSubtasks: Dispatch<SetStateAction<ReactNode[]>>
) => {
  subTasks.push(
    <div key={subTasks.length}>
      <input
        type="text"
        placeholder="It's always good to take a break to avoid burnout, plus happy employees leads to increased productivity."
      />
      <button
        type="button"
        onClick={() => {
          handleDelete(subTasks.length - 1, subTasks, setSubtasks);
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
  setSubtasks: Dispatch<SetStateAction<ReactNode[]>>
) => {
  subTasks.splice(index, 1);
  setSubtasks(subTasks.concat([]));
};

export default TaskAdd;
